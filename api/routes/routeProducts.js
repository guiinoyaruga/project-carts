const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const router = Router();

router.get("/produtos", ProductController.showMeProducts);
router.post("/produtos", ProductController.createProduct);
router.put("/produtos/:id", ProductController.updateProduct);

module.exports = router;
