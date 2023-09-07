const express = require("express");
const db = require('../database');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/developerAuthMiddleware");

const router = express.Router();

router.get("/", (req, res)=> {
  const {publisher_id} = req.query;
  db.query(
      "SELECT * FROM developers WHERE publisher_id = ? AND status != ?", [publisher_id,  "Rejected"],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});

router.get("/count", (req, res)=> {
  const {id} = req.query;
  db.query(
      "CALL dev_counts(?) ", id,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result[0][0]);
        }
      }
    );
});

router.get("/auth",validateToken, (req, res)=> {
  res.send(req.developer);
});


router.get("/getPublisher/:id", (req, res) => {
  const developer_id = req.params.id;
  db.query("CALL get_publisher_name(?)", developer_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0][0].name);
    }
  });
});



router.post("/", (req, res) => {
    const {name, password, publisher_name} = req.body;

    db.query(
      "SELECT * FROM publishers WHERE name = ?", publisher_name,
      (err, result) => {
        if(err) {
          res.send(err);
        } else {

          publisher = result[0];

          if(!publisher) {
              res.send({ error: "Publsiher doesn't Exist" })
          } else {
              bcrypt.hash(password, 10).then((hash) => {

                publisher_id = publisher.publisher_id;
          
                db.query(
                    "INSERT INTO developers(name, password, publisher_id) VALUES (?, ?, ?)",
                    [name, hash, publisher_id],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        res.send("Developer inserted");
                      }
                    }
                  );
            });
          }
        }
          
      }
    );



});

router.post("/login", (req, res) => {
    const { name, password } = req.body;

    db.query(
        `SELECT * FROM developers WHERE name = ?`, name,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {

                const user = result[0];
              
  
                if (!user) {
                  res.json({ error: "Developer doesn't Exist" });
                  return;
                }

                
              
                bcrypt.compare(password, user.password).then((match) => {
                  if (!match) {
                      res.json({ error: "Wrong name And Password Combination" });
                      return;
                  } 
            
              
                  const accessToken = sign(
                    {  developer_id: user.developer_id, developer_name: user.name , developer_status: user.status},
                    "importantsecret"
                  );
              
                  res.json({token: accessToken, developer_name: user.name, developer_id: user.developer_id, developer_status: user.status});
                });
             }
        }
    );
  
   
});


router.put("/updateStatus", (req, res) => {

  let {state, id} = req.body;

  db.query(
      "CALL update_developer_status(?, ?) ", [state , id],
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
  const developer_id = req.params.id;
  db.query("DELETE FROM developers WHERE developer_id = ?", developer_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;