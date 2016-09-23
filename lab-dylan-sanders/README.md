Cowsay as a service

Start by cloning the repo

Run in terminal from the cloned repo:
npm i

To run lint and mocha tests, in terminal type:
gulp

To start the server, in terminal type:
node server.js

To run a get or post request to the cowsay service
Use httpie and while the server is running type in terminal:
`http POST :3000/api/cowsay text=Moose`
`http GET :3000/api/cowsay?text=CowsaysHere`

Or using basic curl for a get request:
`curl http://localhost:3000/api/cowsay?text=yourStringHere`
