const database = require("../models");
const Product = require('../models/products')

class CartController {
  static async showMeOneCart(req, res) {
    const { id } = req.params;
    try {
      const oneCart = await database.Carts.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(oneCart);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async createCart(req, res) {
    const newCart = req.body;
    try {
      const newCartCreated = await database.Carts.create(newCart);
      return res.status(200).json(newCartCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async addItemCart(req, res) {
    const prodId = req.body.product_id;
    let fetchedCart;
    let newQty = 1;
    req.user
      .getCart()
      .then((cart) => {
        fetchedCart = cart;
        return cart.getProducts({
          where: {
            id: prodId,
          },
        });
      })
      .then((products) => {
        let product;
        if (products.length > 0) {
          product = products[0];
        }
        if (product) {
          const oldQty = product.cartItem.quantity;
          newQty = oldQty + 1;
          return product;
        } else {
          return Product.findByPk(prodId);
        }
      })
      .then((product) => {
        return fetchedCart.addProduct(product, {
          through: {
            quantity: newQty,
          },
        });
      })
      .then(() => resp.redirect("/cart"))
      .catch((err) => console.error(err));
  }
}

module.exports = CartController;
