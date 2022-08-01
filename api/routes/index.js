const bodyParser = require("body-parser");
const products = require("./routeProducts");
const carts = require("./routeCarts");
const orders = require("./routeOrders");
const cors = require("cors");


module.exports = (app) => {
 
  app.use((req, res, next) => {
    res.header("http://localhost:4200");
    res.header("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  
  app.use(cors());
  app.use(bodyParser.json(), products, carts, orders)
  
};
