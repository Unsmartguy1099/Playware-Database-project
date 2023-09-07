const express = require("express");
const db = require('../database');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");


const router = express.Router();


router.post("/", (req, res) => {
    const {name, password} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        
        db.query(
            "INSERT INTO admin(name, password ) VALUES ( ?, ?)",
            [name, hash],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Admin Inserted");
              }
            }
          );

    });

});

router.post("/login", (req, res) => {
    const { name, password } = req.body;

    db.query(
        `SELECT * FROM admin WHERE name = ?`, name,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {

                const admin = result[0];
              
  
                if (!admin) {
                  res.json({ error: "No Such Admint exists" });
                  return;
                }

                
              
                bcrypt.compare(password, admin.password).then((match) => {
                  if (!match) {
                      res.json({ error: "Wrong Admin name And Password Combination" });
                      return;
                  } 
                  
                 
              
                  const accessToken = sign(
                    {  adminname: admin.name },
                    "importantsecret"
                  );
              
                  res.json(admin.name);
                });
             }
        }
    );
  
   
});

module.exports = router;