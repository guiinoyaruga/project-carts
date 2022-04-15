const database = require("../models");

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

  static async addToCart(req, res) {
    let qty = req.body.qty;
    const { productId, cartId } = req.params; // o mesmo nome que está na rota
    try {
      const oneCart = await database.Carts.findOne({
        //busca em carts o id de cart passado na rota e salva na variavel
        where: { id: Number(cartId) },
      });

      const oneProduct = await database.Products.findOne({
        //busca em products o id de products passado na rota e salva na variavel
        where: { id: Number(productId) },
      });
      // if(!oneCart){

      // }
      let cartItem = await database.Carts_Items.create({
        //Assim, é criado dentro de cart itens o objeto passando oneCart e oneProducts de

        produto_id: oneProduct.id,
        cart_id: oneCart.id,
        qty: qty,
        price: oneProduct.price,
        total: oneProduct.price * qty,
      });
      
      let cartTotal = oneCart.total + cartItem.total
      
      await database.Carts.update({total: cartItem.total},  { where: { id: Number(cartId) }})

      return res.status(200).json(cartItem);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async showMeOneCartItem(req, res) {
    const { carts_itemsId } = req.params;
    try {

      const oneCart_Items = await database.Carts_Items.findOne({
        where: { id: Number(carts_itemsId) },
      });

      // // let cartItem = await database.Carts_Items.create({
      // //   //Assim, é criado dentro de cart itens o objeto passando oneCart e oneProducts de

      // //   cart_id: oneCart.id,
      // //   produto_id: oneCart_Items.id,
      // });
      return res.status(200).json(oneCart_Items);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  
  static async destroyCart(req, res) {
    const { cartId } = req.params;
    try {

      await database.Carts_Items.destroy({
        where: { cart_id: Number(cartId) },
      }); 
      return res.status(200).json(`Carrinho ${cartId} destruído`);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createOrder(req, res) {

    const { cartId } = req.params; // o mesmo nome que está na rota
    try {
      const oneCart = await database.Carts.findOne({
        //busca em carts o id de cart passado na rota e salva na variavel
        where: { id: Number(cartId) },
      });
    
      let orderCart = await database.Orders.create({
        //Assim, é criado dentro de cart itens o objeto passando oneCart e oneProducts de
        cart_id: oneCart.id,
        status: "Pending"

      });

      return res.status(200).json(orderCart);
    } catch (error) {
      return res.status(500).json(error.message);
    }
}
}

module.exports = CartController;
