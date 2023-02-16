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
#### `index.js` for `body-parser` and `mongoose`
* `mongoose.set("strictQuery", false)` has to be before the connection to clear a deprication warning
* using promises to make things async
* `body-parser` allows us to access the responses to be easier to manage
```javascript
import mongoose, {mongo} from "mongoose";
import bodyParser from "body-parser";

/* MONGOOSE */
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {useNewUrlParser: true});

/* BODY PARSER */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
```


### schema setup
#### `mongoose` in `crmModel.js`
* dictates the types of data and the structure of data that the db will accept
* defines the rules to what the db can accept
```javascript
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: "Enter a first name."
    },
    lastName: {
        type: String,
        required: "Enter a last name."
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
```



## 4. CRUD OPERATIONS
### create `POST` endpoint
#### create the controller in `crmControllers.js`
* these functions will send the data to the database / update the data
* use the endpoint as the portal to all of this
* import mongoose, schema (model)
* create the `POST` controller (`addNewContact`)
```javascript
import mongoose from "mongoose";
import {ContactSchema} from "../models/crmModel";

const Contact = mongoose.model("Contact", ContactSchema); // holds the model

export const addNewContact = (req, res) => {    // POST
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if (err) res.send(err);     // send the error
        res.json(contact);          // send the contact as json
    });
};
```

#### pass the function to the endpoint in `crmRoutes.js`
* pass `addNewContact()` to the `POST` endpoint
* delete the response because the `controller` does the response now
```javascript
import {addNewContact} from "../controllers/crmController";

const routes = (app) => {
    app.route("/contact/:contactId")
        .put((req, res) => res.send("PUT request successful"))
        .delete((req, res) => res.send("DELETE request successful"));
};
```

### create all items `GET` endpoint
#### `crmController.js` new controller
* use the Contact to find everything (empty params)
* send the error if found, othwerwise send the contact
```javascript
export const getContracts = (req, res) => {
    Contact.find({}, (err, contact) => {
        if (err) res.send(err);
        res.json(contact);
    });
};
```

#### `crmRoutes.js` pass the controller to the endpoint
* import `getContracts()` and pass it to the `GET`
* leave the middleware example and, instead of a second function, pass in `getContacts`
```javascript
import {addNewContact, getContacts} from "../controllers/crmController";

const routes = (app) => {
    app.route("/contact")
        .get((req, res, next) => {
            console.log(`request from ${req.originalUrl}`);
            console.log(`request type: ${req.method}`);
            next();
        }, getContacts)
}
```


### create specific id `GET` endpoint
#### create the controller function
* this will use an `id` to find the document
```javascript
export const getContactById = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) res.send(err);
        res.json(contact);
    });
};
```

#### pass the controller function to the endpoint
```javascript
import {
    ...
     getContactById
    } from "../controllers/crmController";

const routes = (app) => {
    ...
    app.route("/contact/:contactId").get(getContactById);
};
```

### create `PUT` endpoint
#### create update function
* get the `_id` from params
* pass the `body`
* `{new: true}` -- option to allow the response to send the new information that was updated
```javascript
export const updateContact = (req, res) => {
    Contact.findOneAndUpdate(
        {_id: req.params.contactId},
        req.body,
        {new: true},
        (err, contact) => {
            if (err) res.send(err);
            res.json(contact);
        }
    );
};

```

#### pass update function to endpoint
```javascript
import {
    ...
    updateContact
} from "../controllers/crmController";

const routes = (app) => {
    ...
    app.route("/contact/:contactId")
        .put(updateContact)
}
```

### create `DELETE` endpoint
* can't send the contact so send a message instead
```javascript
// crmController.js
export const deleteContact = (req, res) => {
    Contact.remove({_id: req.params.contactId}, (err, contact) => {
        if (err) res.send(err);
        res.json(`Contact removed with id ${req.params.contactId}`);
    });
};
```

```javascript
// crmRoutes.js
import {
    ...
    deleteContact
} from "../controllers/crmController";

const routes = (app) => {
    ...
    app.route("/contact/:contactId")
        ...
        .delete(deleteContact);
};
```

## 5. OTHER API OPTIONS
### static file serving
#### serving images
* express can serve static files
* images, files, etc
* create a new `public` folder in the project root
* move images into the `public` folder
```bash
cd crm
mkdir public
```

* in `index.js`, add a line to allow `express` to access the static folder
```javascript
app.use(express.static('public'));
```

* check the image by going to `localhost:3000/image_name.extension`
    * example: `http://localhost:3000/riot_10wks.jpg`


### other potential libraries for APIs
#### others
* [koa](koajs.com)
    * generators instead of callbacks
    * no middleware to make library smaller
* [swagger](swagger.io)
* [loopback](loopback.io)

