/*EXPRESS MIDDLEWARE

This JS file is run on server as a "middleman" between backend and frontend.
Mongoose is utilized in this file to interact with MongoDB.
*/
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const Bouquet = require("../../backend/models/Bouquet");
const Color = require("../../backend/models/Color");
const Flower = require("../../backend/models/Flower");
const FlowerType = require("../../backend/models/FlowerType");
const Image = require("../../backend/models/Image");
const Order = require("../../backend/models/Order");
const Other = require("../../backend/models/Other");
const Wrapping = require("../../backend/models/Wrapping");

dotenv.config();
//Initialize routes
const userRoute = require("../../backend/routes/users");
const productRoute = require("../../backend/routes/products");

mongoose.set("strictQuery", true);

//Connect with MongoDB using username and password of users added on MongoDB Console.
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.z4y7jpi.mongodb.net/?retryWrites=true&w=majority`
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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
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
    occasion: request.body.occasion,
  });
  flower.save().then((createdFlower) => {
    response.status(201).json({
      message: "Flower added successfully",
      flowerId: createdFlower._id,
    });
  });
});

app.use("/api/user", userRoute);
app.use("/api/products", productRoute);

//Export this express application so we can use it in the server
module.exports = app;
