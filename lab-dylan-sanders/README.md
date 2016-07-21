Cowsay as a service

Start by cloning the repo

Run in terminal:
npm i

To run lint tests and mocha, in terminal type:
gulp

To start the server, in terminal type:
node server.js

To run a get or post request to the cowsay service
Use httpie and type in terminal:
http POST :3000 test=Moose

Or using basic curl:
curl -X POST localhost:3000(?)
