## Usage:
Start server: navigate to folder `lab-steventhan`, use command `node server.js` to start server
- GET method: use htttpie command `http localhost:3000/api/cowsay` for default bad request message, or use `http localhost:3000/api/cowsay?text=<your message>`
- POST method: use httpie command `cat msg.json | http localhost:3000` with the existing msg.json, or use `http POST localhost:3000 text='<your message>'`
- Bonus point: while server running, use browser to access this `http://localhost:3000/api/cowsay?text=hello-world&cow=dragon`

## Test:
Use command `gulp` to run gulpfile.js
