/*EXPRESS MIDDLEWARE

This JS file is run on server as a "middleman" between backend and frontend.
Mongoose is utilized in this file to interact with MongoDB.
*/

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const Bouquet = require('../../backend/models/Bouquet');
const Color = require('../../backend/models/Color');
const Customer = require('../../backend/models/Customer');
const Employee = require('../../backend/models/Employee');
const Flower = require('../../backend/models/Flower');
const FlowerType = require('../../backend/models/FlowerType');
const Image = require('../../backend/models/Image');
const Order = require('../../backend/models/Order');
const Other = require('../../backend/models/Other');
const Wrapping = require('../../backend/models/Wrapping');

mongoose.set('strictQuery', true);

//Connect with MongoDB using username and password of users added on MongoDB Console.
mongoose
  .connect(
    "mongodb+srv://group11:VRPivVXSEZ29MgY@cluster0.z4y7jpi.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//Allow our app from localhost:4200 to access server in localhost:3000
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

//BodyParser is an NPM package where it process data sent in an HTTP request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  
//POST request: update/add information on MongoDB.
app.post("/api/flowers", (request, response, next) => {
  const flower = new Flower({
    name: request.body.name,
    color: request.body.color,
    kind: request.body.kind,
    occasion: request.body.occasion
  });
  flower.save().then(createdFlower => {
    response.status(201).json({
      message: "Flower added successfully",
      flowerId: createdFlower._id
    });
  });
});

app.get("/api/flowers", (request, response, next) => {
  Flower.find().then(documents => {
    response.status(200).json({
      message: "Flower list fetched successfully!",
      flowers: documents
    });
  });
});

//Export this express application so we can use it in the server
module.exports = app;
