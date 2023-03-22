const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

router.get("", async (request, response, next) => {
  const products = await axios
    .get(process.env.GETPRODUCT_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + process.env.API_BASE64,
      },
    })
    .then((products) => products.data.PRODUCTS);

  response.send(products);
});

module.exports = router;
