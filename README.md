![cf](https://i.imgur.com/7v5ASc8.png) lab-07-cowsay-http-server
======

# To Submit this Assignment
* fork this repository
* write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
* push to your repository
* submit a pull request to this repository
* submit a link to your PR in canvas
* write a how much time you spent, a question, and an observation on canvas

# Project Structure
* Create these directorys
 * lib -> for supporting modules
 * test -> for test files
* create a main program called server.js
* create a package.json
* create a gulpfile
 * have a lint task for running eslint
 * have a lint task for running mocha
 * have a default task for running the lint and mocha tasks

# Directions
* Create a HTTP Server using the http module
* Create a body parser module that uses Promises to parse the json in the body of `POST`, `PUT`, or `DELETE` requests

## Server Endpoints
### /
for all request to `/` the server should respond with the following:
 * a header containing `Content-Type: text/plain`
 * a status code of **200**
 * a response with the string ...(aka. `res.write(<following string>)`)
```
API Endpoints:
  /api/cowsay
```

### /cowsay
#### GET REQUEST    
* the query string should have the key value `text=<message>`
* the response header should include `Content-Type: text/plain`
* if the query `text=messsage` is set, respond with:  
 * a status code of 200
 * a body including the value returned from `cowsay.say({text: <querystring text>})`
* if the query `text=message` is **not** set, respond with:  
 * status code = 400
 * a body including the value returned from `cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})`

#### POST REQUEST   
* the json body should have the key value `{"text": "<message>"}`
* the response header should include `Content-Type: text/plain`
* if the json `{text: messsage}` is set, respond with:  
 * a status code of 200
 * a body including the value returned from `cowsay.say({text: <json text>})`
* if the json`{text: messsage}`is **not** set, respond with:  
 * status code = 400
 * a body including the value returned from `cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})`

# Tests
* write a test for a `GET` request to `/cowsay?text='hello-world'`
 * should return a status code of `200`

## Bonus
* **2pts** add the ability to change the cowfile using a querysting or json based on the method
