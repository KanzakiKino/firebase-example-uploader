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
    ref.transaction( ref => {
        if ( ref === null ) {
            return filename;
        }
        throw new Object({error:"id duplicated"});
    } );
}

exports.exec = function ( admin, req, res )
{
    if ( req.method !== "POST" ) {
        throw new Object({error: "unexpected request"});
    }

    const savename = Date.now().toString(10);

    const files = new Busboy( { headers: req.headers } );

    var saved = false;
    files.on( "file", (fieldname, file, filename, encoding, mimetype) => {
        if ( fieldname !== "file" || saved ) {
            throw new Object({error:"unknown parameter"});
        }
        file.on( "data", ( data ) => {
            if ( data.length > 1024*1024 ) {
                throw new Object({error:"the file is too big"});
            }
            upload( admin, savename, data ).
                then( e => {
                    register( admin, savename, filename );
                    res.status(200).send( {size:data.length} );
                    return e;
                } ).catch ( e => {
                    throw new Object({error:e.message});
                } );
        } );
        saved = true;
    } );
    files.end( req.rawBody );
};
