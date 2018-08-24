"use strict";

function download ( admin, res, path, filename )
{
    res.attachment( filename );

    const file = admin.storage().bucket().file( "files/"+path );
    return file.download( (e,data) => {
        if ( e ) {
            res.status(400).send({error:e.message});
        }
        res.status(200).send( data );
    } );
}

exports.exec = function ( admin, req, res )
{
    if ( req.method !== "GET" ) {
        res.status(405).send({error: "unexpected request"});
        return;
    }

    const path = req.query.id;
    if ( !path ) {
        res.status(400).send({error: "unknown id"});
        return;
    }

    admin.database().ref( "files/"+path ).on( "value", s => {
        var v = s.val();
        if ( !v ) {
            res.status(400).send({error:"unknown id"});
            return;
        }
        download( admin, res, path, v );
    } );
};
