Elastalert UI
========================
A UI for [Elastalert](https://github.com/Yelp/elastalert)

Prerequisites
============
* [Docker](https://docs.docker.com/engine/installation/)
* [Node.js](https://nodejs.org/en/)

Install Dev Environment
=======================
1. Clone this repo
2. Make sure the prerequistes above are installed
4. In the directory where you cloned this repo, run the following to start the server

`docker-compose up -d`

5. On your local machine make sure you have node and npm installed.
6. Change to the client directory

`cd client`

7. Install angular-cli

`npm install -g @angular/cli`

8. Start the client.

`npm start`

9. You should now see the app running on http://localhost:4200 in your browser. The API server is running at http://localhost:3000. All calls to /api are proxied to localhost:3000 by angular cli.

A few other useful commands
---------------------------
Start with production settings

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
