const express = require("express");
const db = require("../fakeDb");

const router = express.Router();

/** Give a list of shopping items */

router.get("/", function(req, res, next) {
  return res.json({items: db.items});
});


/** Add an item to the shopping list */

router.post("/", function(req, res, next) {
  let item = {
    name: req.body.name,
    price: req.body.price,
  }

  db.items.push(item);

  return res.json({added: item});
});

module.exports = router;