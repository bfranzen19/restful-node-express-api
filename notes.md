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


### inital server setup
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

### inital server files & folders
#### 


### basic routing endpoints
#### 


### basics of middleware and uses
#### 



## 3. DATABASE SETUP
### `mongoDB` basics refresher
#### 


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


