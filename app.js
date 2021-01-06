/** Simple demo Express app. */

const express = require("express");
const app = express();
const itemsRoutes = require("./routes/itemsRoutes");

// process JSON body => req.body
app.use(express.json());

// Route handlers for "/items" routes
app.use("/items", itemsRoutes);

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;