Elastalert UI
========================
A UI for [Elastalert](https://github.com/Yelp/elastalert)

Prerequisites
============
* [Docker](https://docs.docker.com/engine/installation/)
* [Node.js](https://nodejs.org/en/)

Limitations
===========
* Currently only supports email notifications
* Currently only supports elasticsearch [query string queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html)

Install Dev Environment
=======================
1. Clone this repo
2. Make sure the prerequistes above are installed
3. To enable email notifications, add an smtp_auth.yaml file to the elastalert directory. This file should be formatted as follows

    ```
    user: somebody@gmail.com
    password: "MyPa33word"
    ```

    Specify this file when you create an email notification in the UI. For more information see the [elastalert docs](https://elastalert.readthedocs.io/en/latest/ruletypes.html?highlight=smtp_auth_file)

4. In the directory where you cloned this repo, run the following to start the server

`docker-compose up -d`

5. Create the elastalert_status index
    1. Get the container ID of the elasticsearch container by executing
    
    `docker ps`

    2. Once you have the container ID, run the following to create the index

    `docker exec -it {CONTAINER ID} bash -c "cd /opt/elastalert && elastalert-create-index"`
    

6. On your local machine make sure you have node and npm installed.
7. Change to the client directory

`cd client`

8. Install angular-cli

`npm install -g @angular/cli`

9. Start the client

`npm start`

10. You should now see the app running on http://localhost:4200 in your browser. The API server is running at http://localhost:3000. All calls to /api are proxied to localhost:3000 by angular cli.

A few other useful commands
---------------------------
Start with production settings

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

Run without Docker
------------------
* ensure you have node 8.x and npm installed.
* Change es_host in config.yaml in elastalert to the host where your Elastic Search instance is running, for example localhost.
* Change the elastalertDir value in server/config for the appropriate environment (development.js and/or production.js) to the location of your elastalert files. To use the elastalert bundled with this repository, this value would be '../elastalert'.
* Ensure the elastalert_status index is created in your Elasticsearch instance. If you have not already created this index you can do so now by running the create index script. In the elastalert directory specified in the step above, run the following command

`elastalert-create-index`

* In the client directory run the following to compile the client Angular application:

`ng build`

* Run the following from the server directory to install the npm modules, compile the server, and start the application:

```
npm install
gulp server:compile
npm start
```

* Start in production mode:

`NODE_ENV=production npm start`

* To enable email notifications, add an smtp_auth.yaml file to the elastalert directory specifiec above. This file should be formatted as follows

    ```
    user: somebody@gmail.com
    password: "MyPa33word"
    ```

    Specify this file when you create an email notification in the UI. For more information see the [elastalert docs](https://elastalert.readthedocs.io/en/latest/ruletypes.html?highlight=smtp_auth_file)

* The UI will be available at http://localhost:3000/index.html


