"use strict";
const Busboy = require( "busboy" );

function upload ( admin, path, data )
{
    const bucket  = admin.storage().bucket();
    const dstfile = bucket.file( "files/"+path );
    return dstfile.save( data );
}

function register ( admin, path, filename )
{
    const ref = admin.database().ref( "files/"+path );
    return ref.transaction( ref => {
        if ( ref === null ) {
            return filename;
        }
        throw new Object({error:"id duplicated"});
    } );
}

exports.exec = function ( admin, req, res )
{
    if ( req.method !== "POST" ) {
        res.status(405).send( {error: "unexpected request"} );
        return;
    }

    const savename = Date.now().toString(10);

    const files = new Busboy( { headers: req.headers } );

    var saved = false;
    files.on( "file", (fieldname, file, filename, encoding, mimetype) => {
        if ( fieldname !== "file" || saved ) {
            throw new Object({error:"unknown parameter"});
        }
        saved = true;
        file.on( "data", ( data ) => {
            if ( data.length > 1024*1024 ) {
                res.status(400).send({error:"the file is too big"});
                return;
            }
            return upload( admin, savename, data ).
                then( e => {
                    return register( admin, savename, filename ).
                        then( e => {
                            res.status(200).send( {size:data.length} );
                            return e;
                        } ).
                        errorResponse( res, 400 );
                } ).errorResponse( res, 400 );
        } );
    } );

    files.end( req.rawBody );
};
