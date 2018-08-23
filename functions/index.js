"use strict";

const functions = require( "firebase-functions" );
const admin     = require( "firebase-admin" );
admin.initializeApp();

exports.download = functions.https.onRequest( (req,res) =>
{
    try {
        require( "./download" ).exec( admin, req, res );
    } catch ( e ) {
        res.status(405).send( e );
    }
} );

exports.upload = functions.https.onRequest( (req,res) =>
{
    try {
        require( "./upload" ).exec( admin, req, res );
    } catch ( e ) {
        res.status(405).send( e );
    }
} );
