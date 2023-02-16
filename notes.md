# [LinkedIn Learning - Building Restful APIs with `Node.js` and `Express.js`](https://www.linkedin.com/learning/building-restful-apis-with-node-js-and-express-16069959/restful-apis-with-node-and-express?autoplay=true&contextUrn=urn%3Ali%3AlearningCollection%3A6824406680655290368&u=83102426)

## 1. SETTING UP
### intro to APIs and the libraries
#### what is an api
* application programming interface


### intro to postman
#### postman
* allows to test and use api endpoints
* web and desktop applications available


### install `node` and `express`
#### installing `node`
* [nodejs.org](nodejs.org/en/download) downloads node and npm
* [`node.js` docs](https://nodejs.org/en/docs/)

#### initialize the project
* create the project folder, initalize npm, and generate the package.json 
```bash
mkdir crm
cd crm
npm init
```

#### install express
* install express 
```bash
npm i express
```

### install `mongo`
#### install the `community server` 
* [`mongo` docs](https://www.mongodb.com/docs/)
* via `homebrew`
```bash
xcode-select --install
brew tap mongodb/brew 
```

#### running `mongoDB`
* starting `mongo`
```bash
brew services start mongodb-community
```

#### installing `mongoose`
* `mongoose` is a library that helps with modeling the database and brings several built-in tools with validation, business logic, hooks, etc.
* [`mongoose` docs](https://mongoosejs.com/)
```bash
npm i mongoose
```

### basic `babel` setup
#### install babel
* install `core`, `cli`, `node`, and `preset-env` from `babel` into dev dependencies using `--save-dev`
```bash
npm i --save-dev @babel/core @babel/cli @babel/node @babel/preset-env
```

* install `nodemon` & `body-parser`
```bash
npm i nodemon body-parser
```

#### create the config for `babel`
* in the project root (`crm` in this example), create the `.babelrc` file
    * this is the config file for `babel`
```bash
touch .babelrc
```

* `.babelrc` will hold an object
    * in the object, there will be a `"presets"` property that holds an array
    * in the array, put `"@babel/preset-env"` to ensure that when we compile the code, that we compile the latest version of javascript into readable code for the server
```json
{
    "presets": ["@babel/preset-env"]
}
```



## 2. INITIAL SERVER BUILD
### RESTful APIs refresher
* a way to do transactions with a backend using HTTP protocols
* `GET`, `POST`, `PUT`, `DELETE` calls to the backend
* interacting with endpoints created on the backend
* `GET` - fetches data, no body, uses url params
* `POST` - adds data, has body
* `PUT` - updates the existing data
* `DELETE` - deletes the data


### initial server setup
#### changing the `start` script
* create a `start` script in the `package.json` `"scripts"` object
```bash
"scripts": {
    "start": "ndoemon ./index.js --exec babel-node"
},
```

* create the `index.js` file in the `crm` root
```bash
cd crm
touch index.js
```

* creating the server file
    * import `express` and use it
    * create the `PORT` constant
    * create the endpoints
```javascript
import express from "express";

const app = express();
const PORT = 3000;

/* ENDPOINTS */
app.get("/", (req, res) => {
    res.send(`node & express server is running on ${PORT}`);
});

/* SERVER */
app.listen(PORT, () => console.info(`server running: ${PORT}`));
```


### initial server files & folders
#### rearranging the folder structure
* create a `src` folder
```bash
cd crm
mkdir src
```

* inside of `src`, create a `controllers` folder
    * `controllers` are functions that will allow us to get info to the endpoints and forward it to whatever is calling it
```bash
mkdir src/controllers
```

* inside of `src`, create a `models` folder
    * the schema models for the database
```bash
mkdir src/models
```

* inside of `src`, create a `routes` folder
    * basically the endpoints
```bash
mkdir src/routes
```

* create the files for each folder
    * `src/controllers/crmController.js`
    * `src/models/crmModel.js`
    * `src/routes/crmRoutes.js`
```bash
touch src/controllers/crmController.js src/models/crmModel.js src/routes/crmRoutes.js
```


### basic routing endpoints
#### routes
* we need routes to be able to call a url and get something back in a web application
* call a route and go to a specific page or can use routes to define endpoints in an app

#### `index.js`
* import routes
* run the routes inside of the app
```javascript
import routes from "./src/routes/crmRoutes";

const app = express();
routes(app);
```

#### `crmRoutes.js`
* create a function called `routes()` that takes in the `app`
* export the `routes` function
* create the `/contact` route
    * allows us to have `CRUD` commands with that endpoint
    * in this endpoint, we'll have `GET`, `POST`
* create a route for `/contact/:contactId`
    * in this endpoint, we'll have `PUT`, `DELETE`
```javascript
const routes = (app) => {
    app.route("/contact")
        .get((req, res) => res.send("GET request successful"))
        .post((req, res) => res.send("POST request successful"));

    app.route("/contact/:contactId")
        .put((req, res) => res.send("PUT request successful"))
        .delete((req, res) => res.send("DELETE request successful"));
};

export default routes;
```


### basics of middleware and uses
#### middleware
* functions that have access to the `request` and `response` objects in the application and can run their code there
* can make changes to the `request` and `response` objects, can end them, can call another function in the stack using `next()` functions
* often used to call other functions

#### adding middleware to `crmRoutes.js`
* this example will be a `console.log()` of the `request` -- shouldn't do in reality, just for the example
```javascript
const routes = (app) => {
    app.route("/contact")
        .get(
            (req, res, next) => { // have to pass in next
                console.log(    // middleware example
                    `request from ${req.originalUrl} 
                    \nrequest type: ${req.method}`
                );
                next(); // tells it to move on to the next function
            },
            (req, res, next) => { // have to pass in next
                res.send("GET request successful"); // calls the next function
            }
        )};
```



## 3. DATABASE SETUP
### `mongoDB` basics refresher
#### `mongoDB`
[DATABASE] -->> [COLLECTIONS] -->> [DOCUMENTS] -->> [DATA]
* a `mongoDB` database is one big object containing collections
* each collection could be a contextual item (like contacts)
* inside of collections are documents (objects, like individual contacts)
* each document contains the data, which looks like `JSON` with a `key`: `value` pair or arrays of items
* `mongoose` allows us to set up a schema for a collection
    * predefined what each `key`: `value` pair takes as a type

#### [`robomongo and studio 3T`](https://robomongo.org/)
* used to test the database and make sure the data we have in there matches the calls to the endpoints
* download & install `studio 3T`
* click connect
* enter `localhost:27017` as the uri


### database setup
#### 


### schema setup
#### 



## 4. CRUD OPERATIONS
### create `POST` endpoint
#### 


### create all items `GET` endpoint
#### 


### create specific id `GET` endpoint
#### 


### create `PUT` endpoint
#### 


### create `DELETE` endpoint
#### 



## 5. OTHER API OPTIONS
### static file serving
#### 


### other potential libraries for APIs
#### 


