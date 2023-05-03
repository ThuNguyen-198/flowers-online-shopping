const bcrypt = require("bcrypt");

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../src/app/check-auth");

const Options = argon2.Options;
const h_opts = {
  hashLength: 256,
  saltLength: 128,
  parallelism: 8,
  // if hashing is too slow, reduce this by 1 order of magnitude
  memoryCost: 1 << 20,
  type: argon2.argon2id,
};

const express = require("express");
const router = express.Router();

const Customer = require("../../backend/models/Customer");
const Employee = require("../../backend/models/Employee");

const { deserialize } = require("@phc/format");

router.post("/signup/employee", (req, res, next) => {
  const employee = new Employee();
  /*bcrypt.hash(req.body.pwd, 10).then((hash) => {
    employee = {
      //eID: req.body.eID,
      login_ID: req.body.login_ID,
      pwd: req.body.pwd,
      perms: req.body.perms,
    };
  });*/
  argon2.hash(req.body.pwd, h_opts).then((hash) => {
    employee = {
      login_ID: req.body.login_ID,
      pwd: hash,
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
  /*bcrypt.hash(req.body.pwd, 10).then((hash) => {
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
            //cuID: result._id,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  });*/

  argon2.hash(req.body.pwd, h_opts, (raw = false)).then((hash) => {
    //console.log(typeof hash);
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

/*
Something needs to process the email so it is in standard form (lowercase, if nothing else)
*/
router.post("/login", (req, res, next) => {
  let fetchedUser, need_rehash;
  Customer.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Auth failed!" });
        /*
        Should we force it to take the same amount of time whether or not a user was found?
        The reason for this is security: if we just instantly send the response, that would 
        let an attacker know "okay, there's no account associated, move on".
        On the other hand, they could still get that information by trying to create an account.
        So, for now, I'm going to leave it how it was
        */
        //return argon2.hash(req.body.pwd, h_opts);
      }
      fetchedUser = user;
      const pwd_id = deserialize(fetchedUser.pwd).id;
      if (pwd_id === "2b") {
        need_rehash = true;
        return bcrypt.compare(req.body.pwd, fetchedUser.pwd);
      } else return argon2.verify(fetchedUser.pwd, req.body.pwd);
    })
    .then((result) => {
      if (fetchedUser === undefined) {
        //console.log("fetchedUser undefined, presuming this to mean we already sent the status");

        // if !user returns argon2.hash instead of res.status, this needs to be uncommented
        //res.status(401).json({message: "Auth failed!"});
        return;
      } else if (!result) {
        // console.log("Sending 401"); console.log(fetchedUser);
        return res.status(401).json({
          message: "Auth failed!",
        });
      }

      need_rehash = need_rehash || argon2.needsRehash(fetchedUser.pwd, h_opts);
      //console.log("Needs rehash: " + argon2.needsRehash(fetchedUser.pwd, h_opts))
      //console.log(fetchedUser);

      // if password is correct but options have changed, rehash it.
      // Plus, this will convert from bcrypt!
      if (need_rehash) {
        argon2.hash(req.body.pwd, h_opts).then((hash) => {
          fetchedUser.pwd = hash;
          //console.log(fetchedUser);
          //fetchedUser.updateOne()
          fetchedUser
            .save()
            .then((obj) => {
              //console.log("Saved!");
              //console.log(obj);
            })
            .catch((err) => {
              //console.log("Update failed?");
              console.log(err);
            });
        });
      }

      // is this REALLY the correct usage?
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "secret_token_needed_to_be_authorized",
        { expiresIn: "1h" }
      );
      //console.log("Sending 200");
      return res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      //console.log("Sending 401, err");
      console.log(err);
      // should we let them know it was an internal server error? And shouldn't we log the error?
      return res.status(401).json({
        message: "Auth failed!",
      });
    });
});

module.exports = router;
