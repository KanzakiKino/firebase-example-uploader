"use strict";

exports.exec = function ( admin, req, res )
{
    if ( req.method !== "GET" ) {
        res.status(405).send({error: "unexpected request"});
        return;
    }

    const count = req.query.count || 10;
    const query = admin.database().ref("files").orderByKey();

    query.limitToLast( count ).once( "value", s => {
        var result = [];
        s.forEach( v => {
            result.push( {id:v.key, filename:v.val()} );
        } );
        res.status(200).send( {list:result} );
    } ).errorResponse( res, 400 );
};
