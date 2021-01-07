const express = require("express");
const db = require("../fakeDb");

const router = express.Router();

const HTTP_CREATED = 201;

/** Give a list of shopping items */

router.get("/", function(req, res, next) {
  return res.json({items: db.items});
});


/** Add an item to the shopping list */

router.post("/", function(req, res, next) {
  // Object Destructing
  let {name, price} = req.body;

  db.items.push({name, price});

  return res.status(HTTP_CREATED).json({added: {name, price}});
});

/** Get a single item from the shopping list */

router.get("/:name", function(req, res, next) {
  let item = db.items.find(item => item.name === req.params.name);

  return res.json(item);
});

/** Modifies a single item from the shopping list */

router.patch("/:name", function(req, res, next) {
  let item = db.items.find(item => item.name === req.params.name);

  item.name = req.body.name;
  item.price = req.body.price;

  return res.json({updated: item});
});

/** Deletes a single item from the shopping list */

router.delete("/:name", function(req, res, next) {
  db.items = db.items.filter(item => item.name !== req.params.name);

  return res.json({message: "Deleted"});
});




module.exports = router;