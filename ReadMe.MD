# PubNub Access Manager (PAM V3) Token Generator
This NodeJS Server can be used to help DEV test your [PubNub](https://www.pubnub.com/) secured channels.
The idea here is that you can enable access manager on your Keyset within PubNub and then quickly test channel connectivity to those channels by authorising a UUID. 

## What parameters do I need to pass?
This app is built for dev and test environments, as such it doesnt store your keys and secrets. 
An example payload is: 

`    {
        "type": "PN",
        "pub": "pub-c-123456789",
        "sub": "sub-c-987654321",
        "secret": "sec-c-bottom-secret",
        "channels": ["my_channel", "jokes_channel"],
        "uuid: "SomeSecureUser"
    }`
    
Where Type is the type of token we are going to make (In this case a PubNub token).
pub is the publish key for the app you need a token for
sub is the secret key for the app you need a token for
secret is the server side secret used by servers
channels is the array of channels that you want read/write access to
uuid is the UUID that we will authorise these channels on.

### Response object
The response object contains the UUID (In case it had to be changed), the token, expiry number of seconds and the type of token.
`{
"status": 200,
"uuid": "IAmTheMat",
"token": "qEF2AkF0GmKpqeJDdHRsGUOAQ3Jlc6VEY2hhbqFrY2hhbm5lbE5hbWUDQ2dycKBDdXNyoENzcGOgRHV1aWSgQ3BhdKVEY2hhbqBDZ3JwoEN1c3KgQ3NwY6BEdXVpZKBEbWV0YaBEdXVpZGlJQW1UaGVNYXRDc2lnWCAkRn7tylGwtnYBXQyLIqP33D0iy0RoSZxyQvE5T0sJ0w==",
"expiry": 17280,
"type": "PN"
}`
