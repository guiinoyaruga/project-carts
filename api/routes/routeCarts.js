const { Router } = require("express");
const CartController = require("../controllers/CartController");

const router = Router();
router.get("/carts/:id", CartController.showMeOneCart);
// router.get("/carts/:cartId/cartItem/:productId", CartController.showMeOneCartItem);
router.post("/carts", CartController.createCart);
router.put("/carts/:cartId/products/:productId", CartController.addToCart);
router.delete("/carts/:cartId", CartController.destroyCart);
router.post("/carts/:cartId/checkouts", CartController.createOrder);

module.exports = router;
