const { Router } = require("express");
const express = require("express");
const db = require('../database');


const router = express.Router();

router.get("/", (req, res)=> {
    db.query(
        "SELECT * FROM games",
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
});


router.get("/yourOnes", (req, res)=> {

  const {who, id} = req.query;

  // console.log(req.query);

  db.query(
      "CALL get_your_games(?, ?)", [who, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result[0]);
        }
      }
    );
});

router.get("/types/:id", (req, res)=> {

  const type = req.params.id;

  // console.log(type);

  db.query(
      "CALL get_type_games(?)", type,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result[0]);
        }
      }
    );
});

router.get("/landing/:id", (req, res)=> {

  const pos = req.params.id;

  // console.log(type);

  db.query(
      "CALL get_landing_game(?)", pos,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result[0][0]);
        }
      }
    );
});

//can be a procedure
router.get("/genres", (req, res)=> {
  db.query(
      "SELECT DISTINCT(genre) FROM games",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});


router.get("/gamesByGenre", (req, res)=> {
  const {genre} = req.body;
  db.query(
      "SELECT * FROM games WHERE genre = ?",genre,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});


router.get("/byId/:id",  (req, res) => {

    const game_id = req.params.id;
    
    db.query(
        "SELECT * FROM games where game_id = ?", game_id,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(result);
            res.json(result[0]);
          }
        }
    );
});

router.post("/buy", (req, res)=> {

  const {user_id, game_id} = req.body;

  db.query(
      "INSERT INTO game_owned(game_id, user_id) VALUES(?, ?) ",[game_id, user_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("You bought the game!")
        }
      }
    );
});

router.post("/Home_Select", (req, res)=> {

  const {pos, game_id} = req.body;

  db.query(
    "SELECT * FROM landing_page WHERE pos = ? ",pos,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {

          if(result.length === 0) {
            db.query(
              "INSERT INTO landing_page(pos, game_id) VALUES(?, ?) ",[pos, game_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send({success: "Selected"});
                }
              }
            );
          } else {
            db.query(
              "UPDATE landing_page SET game_id = ? WHERE pos = ? ",[game_id, pos],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send({success: "Selected"});
                }
              }
          );
        }
      }
    }
  );

  
});



router.put("/addRating", (req, res)=> {

  const {user_id, game_id, rating} = req.body;
 
  db.query(
      "UPDATE game_owned SET rating = ? WHERE game_id = ? AND user_id = ? ",[rating, game_id, user_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Rating Done!");
        }
      }
    );
});

router.put("/addReview", (req, res)=> {

  const {user_id, game_id, review} = req.body;
 
  db.query(
      "UPDATE game_owned SET review = ? WHERE game_id = ? AND user_id = ? ",[review, game_id, user_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Review Added!");
        }
      }
    );
});

router.get("/reviews", (req, res)=> {

  const {game_id} = req.query;
 
  db.query(
      "SELECT review FROM game_owned WHERE game_id = ? ",game_id,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});


router.get("/bought", (req, res)=> {
  const {user_id, game_id} = req.query;
  // console.log(req.query);
  db.query(
      "SELECT * FROM game_owned WHERE game_id = ? AND user_id = ?",[game_id, user_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result);
            if(result.length != 0) {
              res.send(true)
            } else {
              res.send(false);
            }
        }
      }
    );
});

router.post("/developed", (req, res) => {

  const {name, genre, img_src, developer_id} = req.body;

  db.query(
      "INSERT INTO games(name, genre, img_src, developer_id) VALUES (?, ?, ?, ?)",
      [name, genre, img_src, developer_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Game - added as developed");
        }
      }
  );

});



router.put("/updateStatus", (req, res) => {

  let {state, game_id, price, developer_cut, publisher_cut} = req.body;

  // console.log(req.body);

  if(state != 3 && state != 6 ) {
      price = 0;
  }  

  if(!(state == 4 || state == 7 || state == 9 || state == 11 )) {
    developer_cut = 40;
    publisher_cut = 50;
  }

  // console.log(state , game_id, price, developer_cut, publisher_cut);
  
  db.query(
      "CALL update_game_status(?, ?, ?, ?, ?) ", [state , game_id, price, developer_cut, publisher_cut],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({success: true});
        }
      }
  );

});


router.post("/addWishlist", (req, res) => {

  const {user_id, game_id} = req.body;

  db.query(
      "INSERT INTO wishlist(user_id, game_id) VALUES(?, ?)", [user_id, game_id],
      (err, result) => {
        if (err) {
          // console.log(err.message);
          res.send({error: err.message});
        } else {
          res.send("Added to Wishlist");
        }
      }
  );

});

router.get("/wishlist/:id", (req, res) => {

  const user_id = req.params.id;

  db.query(
      "CALL get_wishlist_games(?)", user_id,
      (err, result) => {
        if (err) {
          // console.log(err.message);
          res.send({error: err.message});
        } else {
          res.send(result[0]);
        }
      }
  );

});


router.delete("/removeWishlist", (req, res) => {

  const {user_id, game_id} = req.query;

  db.query(
      "DELETE FROM wishlist WHERE user_id = ? AND game_id = ?", [user_id, game_id],
      (err, result) => {
        if (err) {
          // console.log(err.message);
          res.send({error: err.message});
        } else {
          res.send("Added to Wishlist");
        }
      }
  );

});




module.exports = router;