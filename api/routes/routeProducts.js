const { Router } = require("express");
const ProductController = require("../controllers/ProductController");

const router = Router();

router.get("/produtos", ProductController.showMeProducts);
router.post("/produtos", ProductController.createProduct);
router.put("/produtos/:id", ProductController.updateProduct);
// router.delete("/pessoas/:id", PessoaController.destroyPerson);
// router.get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.showMeOneMatricula);
// router.post("/pessoas/:estudanteId/matricula", PessoaController.createMatricula);
// router.put("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.updateMatricula);
// router.delete("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.destroyMatricula);

module.exports = router;
