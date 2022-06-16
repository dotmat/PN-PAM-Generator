'use strict';

const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const xmlParser = require('xml2json');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const mustacheExpress = require('mustache-express');
const cryptr = new Cryptr('TokenGenerator'); // For some reason the encrpytion string has to be entered here. I've not been able to use an external reference...?
const bcrypt = require('bcrypt');
const saltRounds = 10;
const PubNub = require('pubnub');


// Config File for the App
const config = require('./config');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.post('/api/v1/generatetoken', (request, response) => {
    console.log("Making Token");
    // This endpoint returns a PAM generated token. 
    // The payload we are expecting is: 
    // {
    //     "type": "PN",
    //     "pub": "pub-c-123456789",
    //     "sub": "sub-c-987654321",
    //     "secret": "sec-c-bottom-secret",
    //     "channels": ["my_channel", "jokes_channel"],
    //     "uuid: "SomeSecureUser"
    // }


    const tokenType = request.query.type || request.body.type || "PN";
    const pubKey = request.body.pub;
    const subkey = request.body.sub;
    const secret = request.body.secret;
    const channelsArray = request.body.channels;
    const uuidToAuth = request.body.uuid; 

    // Create A PN object to manage the connection
    const pubnub = new PubNub({
        publishKey: pubKey,
        subscribeKey: subkey,
        secretKey: secret,
        uuid: "NodeServer",
    });

    const channelsToGrantTo = {};
    for (var i = 0, len = channelsArray.length; i < len; i++) {
        const channelName = channelsArray[i];
        channelsToGrantTo.channelName = {read: true, write:true};
    }

    pubnub.grantToken(
        {
            ttl: 17280,
            authorized_uuid: uuidToAuth,
            resources: {
                channels: channelsToGrantTo
            },
        },
        function (status, token) {
            console.log(token)
            const responseJSON = {
                status:200,
                uuid: uuidToAuth, 
                token: token,
                expiry: 17280,
                type: tokenType
            };
            response.status(responseJSON.status).json(responseJSON);
        });
});

app.listen(config.port, () => console.log(`${config.AppName} App listening on port ${config.port}!`));