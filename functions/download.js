"use strict";

function download ( admin, res, path, filename )
{
    res.attachment( filename );

    const file = admin.storage().bucket().file( "files/"+path );
    file.download( (e,data) => {
        if ( e ) {
            throw new Object({error:e.message});
        }
        res.status(200).send( data );
    } );
}

exports.exec = function ( admin, req, res )
{
    if ( req.method !== "GET" ) {
        throw new Object({error:"unexpected request"});
    }

    const path = req.query.id;
    if ( !path ) {
        throw new Object({error:"unknown id"});
    }

    admin.database().ref( "files/"+path ).on( "value", s => {
        var v = s.val();
        if ( !v ) {
            throw new Object({error:"unknown id"});
        }
        download( admin, res, path, v );
    } );
};
