const { Router } = require("express");
const express = require("express");
const db = require('../database');

const router = express.Router();


router.post("/", (req, res)=> {

    const {name, cut, endDate} = req.body;
  
    // console.log(req.query);
  
    db.query(
        "INSERT into deals(name, cut, end_date) VALUES(?, ?, ?)",[name, cut, endDate],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json("Success");
          }
        }
      );
});


router.put("/addGame", (req, res)=> {

  const {id, game_id} = req.query;

  // console.log(id);

  db.query(
      "UPDATE games SET deal_id = ? WHERE game_id = ?", [id, game_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});

router.put("/deleteGame", (req, res)=> {

  const {game_id} = req.query;

  // console.log(id);

  db.query(
    "UPDATE games SET deal_id = ? WHERE game_id = ?",[null, game_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});



router.get("/", (req, res)=> {
  
    db.query(
        "SELECT * FROM deals",
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
});

router.get("/:id", (req, res)=> {

  const id = req.params.id;

  // console.log(id);
  
  db.query(
      "SELECT * FROM deals WHERE deal_id = ?", id, 
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result[0]);
          
        }
      }
    );
});

router.get("/addedGames/:id", (req, res)=> {

  const id = req.params.id;

  db.query(
      "SELECT * FROM games WHERE status = ? AND deal_id = ?", ["Stored", id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});

router.get("/notAddedGames/:id", (req, res)=> {

  const id = req.params.id;

  db.query(
    "SELECT * FROM games WHERE status = ? AND deal_id IS NULL", "Stored",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result);
          res.json(result);
        }
      }
    );
});

router.delete("/", (req, res)=> {

    const {id} = req.query;

    // console.log(id);
  
    db.query(
        "DELETE FROM deals WHERE deal_id = ?", id,
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