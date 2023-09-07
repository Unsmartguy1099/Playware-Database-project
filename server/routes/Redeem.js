const { Router } = require("express");
const express = require("express");
const db = require('../database');

const router = express.Router();

router.post("/", (req, res)=> {

    const {wallet_value, redeem} = req.body;
  
    // console.log(req.query);
  
    db.query(
        "INSERT into redeem(wallet_value, code) VALUES(?, ?)",[wallet_value, redeem],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json("Success");
          }
        }
      );
});

router.post("/use", (req, res)=> {

  const {redeem, user_id} = req.body;

  db.query(
      "SELECT * FROM redeem WHERE code = ?", redeem,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if(result.length != 0) {
            db.query(
              "UPDATE redeem SET user_id = ? WHERE code = ?",[user_id, redeem],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {

                  db.query(
                    "DELETE FROM redeem WHERE code = ?", redeem,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        res.json("Successfully redeemed the code!");
                      }
                    }
                  );
                 
                }
              }
            );
          } else {
            res.json({error: "Redeem code invalid"});
          }
        }
      }
    );
});


router.post("/", (req, res)=> {

  const {wallet_value, redeem} = req.body;

  // console.log(req.query);

  db.query(
      "INSERT into redeem(wallet_value, redeem) VALUES(?, ?)",[wallet_value, redeem],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json("Success");
        }
      }
    );
});

module.exports = router;