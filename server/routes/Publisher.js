const express = require("express");
const db = require('../database');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/publisherAuthMiddleware");

const router = express.Router();

router.get("/", (req, res)=> {
  db.query(
      "SELECT * FROM publishers WHERE status != ?", "Rejected",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});

router.get("/auth",validateToken, (req, res)=> {
  res.send(req.publisher);
});

router.post("/", (req, res) => {
    const {name, password, legal_terms} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        
        db.query(
            "INSERT INTO publishers(name, password, legal_terms) VALUES (?, ?, ?)",
            [name, hash, legal_terms],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Publisher inserted");
              }
            }
          );

    });

});

router.post("/login", (req, res) => {
    const { name, password } = req.body;

    db.query(
        `SELECT * FROM publishers WHERE name = ?`, name,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {

                const user = result[0];
              
  
                if (!user) {
                  res.json({ error: "Publisher Doesn't Exist" });
                  return;
                }

                
              
                bcrypt.compare(password, user.password).then((match) => {
                  if (!match) {
                      res.json({ error: "Wrong Name And Password Combination" });
                      return;
                  } 
            
              
                  const accessToken = sign(
                    {  publisher_id: user.publisher_id, publisher_name: user.name, publisher_status: user.status  },
                    "importantsecret"
                  );
              
                  res.json({token: accessToken, publisher_name: user.name, publisher_id: user.publisher_id, publisher_status: user.status });
                });
             }
        }
    );
  
   
});

router.put("/updateStatus", (req, res) => {

  let {state, id} = req.body;

  db.query(
      "CALL update_publisher_status(?, ?) ", [state , id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({success: true});
        }
      }
  );

});


router.delete("/delete/:id", (req, res) => {
  const publisher_id = req.params.id;
  db.query("DELETE FROM publishers WHERE publisher_id = ?", publisher_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;