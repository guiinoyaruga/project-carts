const { Router } = require("express");
const CartController = require("../controllers/CartController");

const router = Router();

router.get("/carrinho/:id", CartController.showMeOneCart);
router.post("/carrinho", CartController.createCart);
router.put("/carts/items/:id", CartController.addItemCart);

module.exports = router;
