const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const Cart = require("../../backend/models/Cart");

const API_BASE64 = "NTA0NDYyOjF1RmJmRQ==";
const GETPRODUCT_URL =
  "https://www.floristone.com/api/rest/flowershop/getproducts";
const CART_URL = "https://www.floristone.com/api/rest/shoppingcart";

router.get("/:category", async (request, response, next) => {
  const categoryURL =
    GETPRODUCT_URL + `?category=${request.params.category}&count=12`;
  const products = await axios
    .get(categoryURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + API_BASE64,
      },
    })
    .then((products) => products.data.PRODUCTS);

  response.send(products);
});

router.post("/cart/add", async (request, response, next) => {
  const cartProduct = new Cart({
    productCode: request.body.code,
    productName: request.body.name,
    imageSmall: request.body.image_small,
    productDescription: request.body.description,
    productPrice: request.body.price,
    quantity: 1,
  });

  cartProduct
    .save()
    .then((result) => {
      response.status(201).json({
        message: "Added product successfully",
        products: result,
      });
    })
    .catch((err) => {
      return response.status(500).json({
        message: err,
      });
    });
});

module.exports = router;
