const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

router.get("/:category", async (request, response, next) => {
  const categoryURL =
    process.env.GETPRODUCT_URL + `?category=${request.params.category}`;
  console.log(categoryURL);
  const products = await axios
    .get(categoryURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + process.env.API_BASE64,
      },
    })
    .then((products) => products.data.PRODUCTS);

  response.send(products);
});

module.exports = router;
