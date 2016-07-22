# Lab 07: Cowsay as a service

This project creates a simple http server through which a user can use "GET" or "POST" requests to access the cowsay module (which in itself will respond with a text image of a cow saying the words inputted by the user).  

## Getting Started
To begin, simply clone down the repo and run it in the terminal via `npm i`. All commands outlaid below will assume input in terminal.

- To start the server, use `node lab-shane/lib/server.js`.

  - To send a "GET" request, use `curl localhost:3000/api/cowsay?text=Hello`.

  - To send a "POST" request, use `curl -X POST localhost:3000/api/cowsay -d '{"text":"Moooooo!"}'`.

  ⋅⋅⋅Any other type of request will issue a response asking you to remedy your request to one of these two types.

- To run any tests or lint files, simply use `gulp`.
