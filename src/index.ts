/// <reference path="../typings/index.d.ts" />
import * as express from "express";  
import * as bodyParser from "body-parser";  
import * as Quote from "./entities/quote";  
import * as Comment from "./entities/comment";
import * as Message from "./entities/message";
import * as User from "./entities/user";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import * as facebookChatAPI from "facebook-chat-api";
import * as apiController from "./controllers/api";
var SALT_WORK_FACTOR = 10;

// node-restul doesn't have typings, so we'll have to use plain js require to get it :-(
var restful = require('node-restful');  // ===============

// COMMON VARIABLES
// ===============
let appPort: number =  (process.env.PORT || 3000);  
// let connectionString: string = process.env.MONGODB_URI;  
let connectionString: string = 'mongodb://wcso:wcso@ds161164.mlab.com:61164/wcso';


// ===============
// Express App
// ===============
var app = express();  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true}));
const login = require("facebook-chat-api");

app.set("port", appPort);
app.use(morgan('dev')); // log requests to the console  

//User
app.post("/api/user", apiController.postUser);
app.get("/api/user", apiController.getUsers);

//Message
app.post("/messages/sendmessage", apiController.sendMessage);
app.get("/messages", apiController.getMessages);

app.get("/api", apiController.getApi);
app.post("/authenticate", apiController.authenticate);



// ===============
// REST API LOGIC
// ===============
/*
var quoteApi = restful.model("quote", Quote.schema)  
.methods(["get", "post", "put", "delete"])
.register(app, "/api/quote");

var commentApi = restful.model("comment", Comment.schema)  
.methods(["get", "post", "put", "delete"])
.register(app, "/api/comment");

var messageApi = restful.model("message", Message.schema)  
.methods(["get", "post", "put", "delete"])
.register(app, "/api/message");
*/
// ===============
// DB 
// ===============
var dbOpt : any = { 
    useMongoClient: true
} 

mongoose.connect(connectionString, dbOpt);

// ===============
// SERVER
// ===============
let port:number = app.get("port");  
var server = app.listen(port, function(){

    // note: Only for debugging purposes to see that your variables are set correctly...
    console.log("connectionString is: " + connectionString);
    console.log("port is: " + port);
});


