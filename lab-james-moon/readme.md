Here's a basic chat server that is supposed to return to the client a cow saying a message. All requests to the server outside of using the endpoint `/api/cowsay` will return with a standard response message. `GET` and `POST` requests to `/api/cowsay` will return with a cow saying the specified message.

First, clone down the repo.

Next, install dependencies via `npm install`

Start the server with `node server`

##GET requests
Accepts query strings
`curl http://localhost:3000/api/cowsay?text=hello`

##POST requests
Accepts json format data (below is with HTTPie)
`HTTP :3000/api/cowsay text=hello`

##Test
run `gulp` for eslint and mocha testing
