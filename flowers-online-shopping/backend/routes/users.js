//For encrypting password
const bcrypt = require("bcrypt");

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
          message: "Employee account created!",
          customer: {
            ...result,
            cuID: result._id,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });

  //Save in the DB
});

module.exports = router;
