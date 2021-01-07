const request = require('supertest');

const app = require('../app');
const db = require('../fakeDb');

let coffee = {
  "name": "coffee",
  "price": 5.00
};

beforeEach(function () {
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