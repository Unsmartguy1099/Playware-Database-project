const { Router } = require("express");
const express = require("express");
const db = require('../database');


const router = express.Router();

router.post("/", (req, res) => {

   const {game_name, dlc_name, price, developer_id} = req.body;
  
   db.query(
        "SELECT * FROM games WHERE name = ? AND developer_id = ?", [game_name, developer_id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            game = result[0];
  
            if(!game) {
                res.send({error : `You have no game named - ${game_name}`});
                return;
            }
        
  
            // if(game.status != "Stored") res.send("Game has to be released/stored before adding Add Ons");
  
            db.query(
              "INSERT INTO dlc(name, price, game_name) VALUES(?, ?, ?)", [dlc_name , price, game_name],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send(`${dlc_name} - is added to : ${game_name} `);
                }
              }
            );
            
          }
        }
    );
  
});

router.get("/developer", (req, res)=> {

    const {id} = req.query;
  
    // console.log(req.query);
  
    db.query(
        "CALL get_developer_dlcs(?)", id,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json(result[0]);
          }
        }
      );
});

router.get("/game", (req, res)=> {

    const {name} = req.query;
  
    // console.log(req.query);
  
    db.query(
        "SELECT * FROM dlc WHERE game_name = ?", name,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
});


router.delete("/", (req, res)=> {

    const {id} = req.query;

    // console.log(id);
  
    db.query(
        "DELETE FROM dlc WHERE dlc_id = ?", id,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
});

module.exports = router;