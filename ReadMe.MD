# Node Express API and HTML Engine
This (mini) app is a designed as a template to help you build NodeJS API and HTML based apps.

The idea being that you can serve both HTML and API from one deployable payload.
You can then configure this package to serve HTML, JSON or XML acting as a human web server, API server or both.
In short, you can make api.myapp.tld and www.myapp.tld be served by the same engine. 

## But WHY?
So really this is down to costings, location of servers and app flexibility. 

### Costing
All of the main cloud providers offer a free tier for NodeJS apps which at time of writing was/is massively good value. 
Being able to load balance between all three means you can run on free tiers for longer and in more locations.

### Location
Being able to multicloud means that I can host the app in multiple locations at the same time, AWS East, Google West and Azure Germany.

### App Flexibility
Almost all app's and API based servers require some kind of console page.
EG:
https://twilio.com/console
https://admin.pubnub.com/
https://github.com/userProfileNameGoesHere

Being able to host both the API and HTML from the same service means that you can keep data on a single pool, database and not need to grant multiple servers access to this data..

## What do GET endpoints look like now??
So by default any GET request will return HTML - unless that endpoint is for data only. 

However if you are GET'ting data such as an airport or phone number information. You might want only the data or the HTML. 

If a request is for a GET without any ?format=FORMAT then treat the request as a HTML based request.
If the request contains a format type ie: ?format=json then scan for the x-api-key header, validate and process the request.


EG: 
https://*.mydomain.tld/airport/kjfk <- Returns HTML page of airport KJFK.
https://*.mydomain.tld/airport/kjfk?format=json <- Returns JSON of airport KJFK.

OR: 
https//*.mydomain.tld/user/phoneNumbers <- Returns a HTML page of phone numbers belonging to a user.
https//*.mydomain.tld/user/phoneNumbers?format=json <- Retuns JSON object containing phone numbers belonging to a user.

## What does a POST endpoint look like. 
So because browsers also support POST requests, the decision was taken to support keyless POST requests and also API key'ed requests. 
This means you can use HTML forms and POST methods to send data from a browser page to a server for processing but you can also recieve POST requests as an API. 
The difference here is cookies, in browsers you can pass the cookie data back with the HTML request and the JWT for the user is (usually) passed in the cookie payload. 
In an API request the API key might be static and is usually passed in an x-api-key header.

## So what about images, media and other things a web server still serves?
So images, CSS, JS and other parts of a web server can be served from this web server. 
However its worth noting that modern CDN's can host copies of that data for a fraction of the transaction price as a paid Apache2 or nginx server. So it usually ends up being cheaper to upload images, JS and CSS to a 3rd party service.