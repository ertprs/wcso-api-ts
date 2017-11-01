"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../typings/index.d.ts" />
const express = require("express");
const bodyParser = require("body-parser");
const Quote = require("./entities/quote");
const Comment = require("./entities/comment");
const Message = require("./entities/message");
const mongoose = require("mongoose");
const morgan = require("morgan");
const apiController = require("./controllers/api");
var SALT_WORK_FACTOR = 10;
// node-restul doesn't have typings, so we'll have to use plain js require to get it :-(
var restful = require('node-restful'); // ===============
// COMMON VARIABLES
// ===============
let appPort = (process.env.PORT || 3000);
// let connectionString: string = process.env.MONGODB_URI;  
let connectionString = 'mongodb://wcso:wcso@ds161164.mlab.com:61164/wcso';
// ===============
// Express App
// ===============
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
var quoteApi = restful.model("quote", Quote.schema)
    .methods(["get", "post", "put", "delete"])
    .register(app, "/api/quote");
var commentApi = restful.model("comment", Comment.schema)
    .methods(["get", "post", "put", "delete"])
    .register(app, "/api/comment");
var messageApi = restful.model("message", Message.schema)
    .methods(["get", "post", "put", "delete"])
    .register(app, "/api/message");
// ===============
// DB 
// ===============
var dbOpt = {
    useMongoClient: true
};
mongoose.connect(connectionString, dbOpt);
// ===============
// SERVER
// ===============
let port = app.get("port");
var server = app.listen(port, function () {
    // note: Only for debugging purposes to see that your variables are set correctly...
    console.log("connectionString is: " + connectionString);
    console.log("port is: " + port);
});
//# sourceMappingURL=index.js.map