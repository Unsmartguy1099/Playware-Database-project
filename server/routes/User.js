const express = require("express");
const db = require('../database');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/userAuthmiddleWare");

const router = express.Router();

router.get("/", (req, res)=> {
  db.query(
      "SELECT * FROM users",
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
  res.send(req.user);
});


router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  db.query("SELECT * FROM users WHERE user_id = ?", user_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
});


router.post("/", (req, res) => {
    const {name, email, password, gamer_tag} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        
        db.query(
            "INSERT INTO users(name, email, password, gamer_tag) VALUES (?, ?, ?, ?)",
            [name, email, hash, gamer_tag],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Values Inserted");
              }
            }
          );

    });

});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        `SELECT * FROM users WHERE email = ?`, email,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {

                const user = result[0];
              
  
                if (!user) {
                  res.json({ error: "User Doesn't Exist" });
                  return;
                }

                
              
                bcrypt.compare(password, user.password).then((match) => {
                  if (!match) {
                      res.json({ error: "Wrong Username And Password Combination" });
                      return;
                  } 
                  
                //  console.log(user);
              
                  const accessToken = sign(
                    {  user_id: user.user_id, user_name: user.name , user_wallet: user.wallet},
                    "importantsecret"
                  );
              
                  res.json({token: accessToken, user_name: user.name, user_id: user.user_id, user_wallet: user.wallet});
                });
             }
        }
    );
  
   
});

router.put("/updateStatus", (req, res) => {

  const {id, state} = req.query;

  let status = "";
  
  if(state == 1) status = "Registered";
  else status = "Banned";

  db.query("UPDATE users SET status = ? WHERE user_id = ?", [status, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/edit", (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  db.query(
      `SELECT * FROM users WHERE email = ?`, email,
      (err, result) => {
          if (err) {
              console.log(err);
          } else {

              const user = result[0];
            

              if (!user) {
                res.json({ error: "User Doesn't Exist" });
                return;
              }

              
            
              bcrypt.compare(oldPassword, user.password).then((match) => {
                if (!match) {
                    res.json({ error: "Wrong Password! " });
                    return;
                } else {
                    bcrypt.hash(newPassword, 10).then((hash) => {
          
                      db.query(
                          "UPDATE users SET password = ? WHERE user_id = ? ",
                          [hash, user.user_id],
                          (err, result) => {
                            if (err) {
                              console.log(err);
                            } else {
                              res.send("password updated");
                            }
                          }
                        );
              
                    });

                }
              });

           }
      }
  );

 
});



router.delete("/:id", (req, res) => {
  const user_id = req.params.id;
  db.query("DELETE FROM users WHERE user_id = ?", user_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;