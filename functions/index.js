"use strict";

const functions = require( "firebase-functions" );
const admin     = require( "firebase-admin" );
admin.initializeApp();

Promise.prototype.errorResponse = function ( res, htret )
{
    this.catch( e => {
        res.status(htret).send( e );
    } );
};

exports.download = functions.https.onRequest( (req,res) =>
{
    require( "./download" ).exec( admin, req, res );
} );

exports.upload = functions.https.onRequest( (req,res) =>
{
    require( "./upload" ).exec( admin, req, res );
} );

exports.files = functions.https.onRequest( (req,res) =>
{
    require( "./files" ).exec( admin, req, res );
} );
