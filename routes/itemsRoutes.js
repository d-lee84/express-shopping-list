const express = require("express");
const db = require("../fakeDb");
const fsP = require("fs/promises");

const router = express.Router();

const HTTP_CREATED = 201;

/** Give a list of shopping items */

router.get("/", async function(req, res, next) {
  let items = await readListFromFile();
  
  return res.json(items);
  // return res.json({items: db.items});
});


/** Add an item to the shopping list */

router.post("/", async function(req, res, next) {
  // Object Destructing
  let {name, price} = req.body;

  let list = await readListFromFile();
  list.items.push({name, price});
  await writeToFile(list);

  // db.items.push({name, price});

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


async function readListFromFile() {
  try {
    var contents = await fsP.readFile("list.json", "utf8");
    console.log("File contents:", contents);
  } catch (err) {
    console.error("File could not be read");
    process.exit(1);
  }

  return JSON.parse(contents);

}

/* Takes string content and writes it to results.json file */
async function writeToFile(content) {
  try {
    await fsP.writeFile("list.json", JSON.stringify(content), "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  
  console.log("Successfully wrote file");
}



module.exports = router;