//For encrypting password
// HEY!!! We agreed Argon2id! If that's not available for JS, so be it, but there needs to be discussion.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../src/app/check-auth");

const express = require("express");
const router = express.Router();

const Customer = require("../../backend/models/Customer");
const Employee = require("../../backend/models/Employee");

router.post("/signup/employee", (req, res, next) => {
  const employee = new Employee();
  bcrypt.hash(req.body.pwd, 10).then((hash) => {
    employee = {
      eID: req.body.eID,
      login_ID: req.body.login_ID,
      pwd: req.body.pwd,
      perms: req.body.perms,
    };
  });

  //Save in the DB
  employee
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Employee account created!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/signup/customer", (req, res, next) => {
  bcrypt.hash(req.body.pwd, 10).then((hash) => {
    const customer = new Customer({
      user: req.body.user,
      email: req.body.email,
      pwd: hash,
      phone: req.body.phone,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    customer
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Customer account created!",
          customer: {
            ...result,
            cuID: result._id,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  //console.log(Customer.find({ email: req.body.email }));
  Customer.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Auth failed!" });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.pwd, user.pwd);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed!",
        });
      }

      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "secret_token_needed_to_be_authorized",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed!",
      });
    });
});

module.exports = router;
