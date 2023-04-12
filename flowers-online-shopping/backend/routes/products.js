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

//GET ALL CART ITEMS
router.post("/cart/items", async (request, response, next) => {
  let email = request.body.userEmail;

  Cart.findOne({ email: email }).then((cartItems) => {
    if (cartItems) {
      response.status(200).json(cartItems.product);
    } else {
      response.status(404).json({ message: "Not found!" });
    }
  });
});

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

//GET DETAIL BOUQUET
router.get("/detail/:code", async (request, response, next) => {
  const singleProductURL = `${GETPRODUCT_URL}?code=${request.params.code}`;
  const products = await axios
    .get(singleProductURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + API_BASE64,
      },
    })
    .then((products) => {
      response.status(200).json(products.data.PRODUCTS[0]);
    })
    .catch((error) => {
      console.log(error);
    });
});

//ADD TO CART
router.post("/cart/add", async (request, response, next) => {
  let email = request.body.email;
  let newProduct = request.body.product;

  Cart.findOneAndUpdate(
    { email: email },
    {
      $push: { product: newProduct },
    },
    { new: true, upsert: true }
  )
    .then((fetchedCart) => {
      console.log(fetchedCart);
    })
    .catch((error) => {
      console.log(error);
    });

  response.status(200).json({
    message: "Cart added successfully",
  });
});

module.exports = router;
