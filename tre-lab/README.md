## Simple server handling requests to a cowsay service that repeats the users input.

Clone down then run in terminal:
```
npm i
```
To run tests and lint files in terminal type:
```
gulp
```
To start server in terminal:
```
node server.js
```

To request a list of all cow models
```
http GET localhost:8000/api/cowsay/list
```

To request a cowsay in terminal type:
```
http GET localhost:3000/api/cowsay text==howdy
```
