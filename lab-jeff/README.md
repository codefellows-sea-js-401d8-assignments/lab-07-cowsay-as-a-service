![Triforce](./resources/triforce2.gif)

#HTTP Server#

###Summary###
An HTTP server with a Cowsay() API endpoint that takes GET and POST requests and responds with a cow!

###Instructions###
From the root directory of 'lab-jeff' run the following command in your terminal:

`npm install`

Then to start the server:

`node ./api/cowsay/server.js`

Finally, you can send POST or GET requests to the API Endpoint 'http://localhost:3000/api/cowsay'. The POST requests needs to contain JSON, ie: {"text":"Moooooo"}. The GET request needs to have a query string attatched to the end of the URL, ie: ?text=noob

POST example: `curl -H "Content-Type: application/json" -X POST -d '{"text":"Moooooo"}' http://localhost:3000/api/cowsay`

GET example: `curl -H "Content-Type: text/plain" -X GET http://localhost:3000/api/cowsay?text=noob`


###Test###

To run the tests, linter and watcher type the command:
`gulp`


`Jeff Gebhardt - CF JS 401`
