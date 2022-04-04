const database = require("../models");

class ProductController {
  static async showMeProducts(req, res) {
    try {
      const allProducts = await database.Products.findAll();
      return res.status(200).json(allProducts);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createProduct(req, res) {
    const newProduct = req.body;
    try {
      const newProductCreated = await database.Products.create(newProduct);
      return res.status(200).json(newProductCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const newParams = req.body;
    try {
      await database.Products.update(newParams, { where: { id: Number(id) } });
      const updatedProduct = await database.Products.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

module.exports = ProductController;