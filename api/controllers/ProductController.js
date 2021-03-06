const database = require("../models");
const prod = require("../models/products");

class ProductController {
  static async showMeProducts(req, res) {
    try {
      const allProducts = await database.Products.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      return res.status(200).json(allProducts);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createProduct(req, res) {
    const newProduct = req.body;
    try {
      const newProductCreated = await database.Products.create(newProduct);
      return res
        .status(200)
        .json(
          `Produto ${newProduct.name} criado no valor de ${newProduct.price}`
        );
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const newParams = req.body;

    try {
      const productExist = await database.Products.findOne({
        where: { id: Number(id) },
      });

      if (productExist) {
        await database.Products.update(newParams, {
          where: { id: Number(id) },
        });
        const updatedProduct = await database.Products.findOne({
          where: { id: Number(id) },
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
          },
        });
        return res.status(200).json(updatedProduct);
      } else if (!productExist) {
        return res.status(404).json(`Produto ${id} não encontrado`);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ProductController;
