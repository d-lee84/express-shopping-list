const request = require('supertest');

const app = require('../app');
const db = require('../fakeDb');

let coffee;

beforeEach(function () {
  coffee = {
    "name": "coffee",
    "price": 5.00
  };
  db.items.push(coffee);
});

afterEach(function () {
  db.items = [];
});

describe("GET /items", function () {
  it("Get list of shopping list items", async function () {
    const resp = await request(app).get("/items");

    expect(resp.body).toEqual({ items: [coffee] });
  });
});

describe("POST /items", function () {
  it("Add item to shopping list", async function () {
    let tea = {
      "name": "tea",
      "price": 3.00
    };

    const resp = await request(app)
      .post("/items")
      .send(tea);

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ added: tea });
  });
});

/** GET /items/:name - Get a single item from the shopping list */

describe("GET /items/:name", function () {
  it("Get a single item from the shopping list", async function () {
    const resp = await request(app).get("/items/coffee");

    expect(resp.body).toEqual( coffee );
  });
});

/** PATCH /items/:name - Modify a single item from the shopping list */

describe("PATCH /items/:name", function () {
  it("Modify a single item from the shopping list", async function () {

    let coffeeModif = {
      name: "coffee2",
      price: 15.99
    }

    const resp = await request(app)
      .patch("/items/coffee")
      .send(coffeeModif);

    expect(resp.body).toEqual({ updated: coffeeModif });
  });
});

/** DELETE /items/:name - Delete a single item from the shopping list */

describe("DELETE /items/:name", function () {
  it("Delete a single item from the shopping list", async function () {
    const resp = await request(app).delete("/items/coffee");

    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.items).toEqual([]);
  });
});
