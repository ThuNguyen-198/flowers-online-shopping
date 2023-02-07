//EXPRESS MIDDLEWARE

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Flower = require('./models/flowerSchema');

mongoose.set('strictQuery', true);

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  

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

module.exports = app;