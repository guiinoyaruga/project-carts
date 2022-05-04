const database = require("../models");
const Products = require("../models/products");

class CartController {
  static async showMeOneCart(req, res) {
    const { id } = req.params;
    try {
      const oneCart = await database.Carts.findAll({
        where: { id: Number(id) },
        include: database.Carts_Items,
      });

      if (oneCart !== null && oneCart) {
        return res.status(200).json(oneCart);
      } else if (oneCart === null) {
        return res.status(404).json(`Carrinho ${id} não encontrado`);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createCart(req, res) {
    const newCart = req.body;
    let start = 0;
    try {
      const newCartCreated = await database.Carts.create(
        { total: start },
        newCart
      );
      return res.status(200).json(newCartCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async addToCart(req, res) {
    let qty = req.body.qty;
    const { productId, cartId } = req.params; // o mesmo nome que está na rota
    try {
      const oneCart = await database.Carts.findOne({
        //Busca em carts o id de cartS passado na rota e salva na variável oneCart
        where: { id: Number(cartId) },
      });
      const oneProduct = await database.Products.findOne({
        //Busca em products o id de products passado na rota e salva na variável oneProduct
        where: { id: Number(productId) },
      });

      if (oneCart && oneProduct) {
        let cartItem = await database.Carts_Items.create({
          ProductId: oneProduct.id,
          CartId: oneCart.id,
          qty: qty,
          price: oneProduct.price,
          total: oneProduct.price * qty,
        });

        let cartTotal = oneCart.total + cartItem.total;
        await database.Carts.update(
          { total: cartTotal },
          { where: { id: Number(cartId) } }
        );
        return res.status(200).json(cartItem);
      } else {
        return res.status(404).json("Produto ou Carrinho não encontrado");
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroyCart(req, res) {
    const { cartId } = req.params;
    let empty = 0;
    try {
      const cartExist = await database.Carts.findOne({
        where: { id: Number(cartId) },
      });

      if (cartExist) {
        await database.Carts_Items.destroy({
          where: { cart_id: Number(cartId) },
        });

        await database.Carts.update(
          { total: empty },
          { where: { id: Number(cartId) } }
        );

        return res.status(200).json(`Carrinho ${cartId} esvaziado`);
      } else if (!cartExist) {
        return res.status(404).json(`Carrinho ${cartId} não encontrado`);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createOrder(req, res) {
    const { cartId } = req.params;
    try {
      const oneCart = await database.Carts.findOne({
        where: { id: Number(cartId) },
      });

      let orderCart = await database.Orders.create({
        cart_id: oneCart.id,
        status: "Pending",
      });

      return res.status(200).json(orderCart);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = CartController;
