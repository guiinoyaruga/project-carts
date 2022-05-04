const { Router } = require("express");
const OrderController = require("../controllers/OrderController");

const router = Router();

router.get("/orders/:orderId", OrderController.showMeOneOrder);
router.put("/orders/:orderId", OrderController.updateOrder);
router.put("/orders/:orderId/confirmation", OrderController.updateToDoneOrder)

module.exports = router;