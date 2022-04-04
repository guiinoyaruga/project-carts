const bodyParser = require("body-parser");
const products = require("./routeProducts");
const carts = require("./routeCarts");

module.exports = (app) => {
  app.use(bodyParser.json(), products, carts)
};
