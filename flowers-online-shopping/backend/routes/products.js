const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const Cart = require("../../backend/models/Cart");
const CreditCard = require("../../backend/models/CustomerOrder");
const CustomerInfo = require("../../backend/models/CustomerOrder");
const CustomerOrder = require("../../backend/models/CustomerOrder");
const OrderInfo = require("../../backend/models/CustomerOrder");

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
      return;
    }
  });
});

// -------------------------------BOUQUET--------------------------------- //
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

// -------------------------------CART--------------------------------- //
//ADD TO CART
router.post("/cart/add", async (request, response, next) => {
  let email = request.body.email;
  let newProduct = request.body.product;

  Cart.findOne({ email: email })
    .then((fetchedCart) => {
      if (!fetchedCart) {
        Cart.updateOne(
          { email: email },
          {
            $push: { product: newProduct },
          },
          { new: true, upsert: true }
        ).then((result) => {
          console.log("added new cart");
          return;
        });
      } else {
        Cart.findOne({
          product: { $elemMatch: { productCode: newProduct.productCode } },
        }).then((cartExisted) => {
          if (cartExisted) {
            console.log("item duplicated");
            return;
          }
          Cart.findOneAndUpdate(
            { email: email },
            {
              $push: { product: newProduct },
            },
            { new: true, upsert: true }
          ).then((result) => {});
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  response.status(200).json({
    message: "Cart added successfully",
  });
});

//UPDATE QUANTITY
router.post("/cart/quantity", async (request, response, next) => {
  let email = request.body.email;
  let productCode = request.body.productCode;
  let newQuantity = +request.body.quantity;

  const filter = {
    email: email,
    product: { $elemMatch: { productCode: productCode } },
  };
  const update = { $set: { "product.$.quantity": newQuantity } };

  Cart.updateOne(filter, update)
    .then((fetchedCart) => {})
    .catch((error) => {
      console.log(error);
    });

  response.status(200).json({
    message: "Cart added successfully",
  });
});

//DELETE CART ITEM
router.delete(
  "/cart/delete/:email/:productCode",
  async (request, response, next) => {
    const filter = {
      email: request.params.email,
      product: { $elemMatch: { productCode: request.params.productCode } },
    };
    Cart.updateOne(filter, {
      $pull: { product: { productCode: request.params.productCode } },
    }).then((result) => {
      console.log("item deleted");
    });

    response.status(200).json({
      message: "item deleted successfully",
    });
  }
);

router.post("/cart/deleteAll", async (request, response, next) => {
  const filter = {
    email: request.body.email,
  };
  Cart.deleteOne(filter)
    .then((result) => {
      console.log(result);
      response.status(200).json({ message: "Cart deleted!" });
    })
    .catch((error) => {
      console.log(error);
    });
});

// CHECKOUT
router.post("/cart/checkout", async (request, response, next) => {
  const customer = new CustomerInfo({
    firstname: request.body.customerInfo.firstname,
    lastname: request.body.customerInfo.lastname,
    address: request.body.customerInfo.address,
    city: request.body.customerInfo.city,
    state: request.body.customerInfo.state,
    zip: request.body.customerInfo.zip,
  });

  const order = new CustomerOrder({
    products: request.body.cartItems,
    customerInfo: customer,
    total: +request.body.totalPrice.toFixed(2),
    email: request.body.userEmail,
    date: new Date(),
  });

  CustomerOrder.insertMany(order).then((result) => {
    console.log("Checked out confirmed.");
    Cart.deleteOne({ email: request.body.userEmail }).then((result) => {
      console.log(result);
      response.status(200).json({ message: "Cart deleted!" });
    });
  });
});

router.get("/cart/all-history", async (request, response, next) => {
  CustomerOrder.find({}, "total date products").then((result) => {
    response.status(200).json(result);
  });
});

module.exports = router;
