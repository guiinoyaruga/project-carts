const database = require("../models");

class OrderController {
  static async showMeOneOrder(req, res) {
    const { orderId } = req.params;
    try {
      const oneOrder = await database.Orders.findOne({
        where: { id: Number(orderId) },
      });
      if (oneOrder) {
        return res.status(200).json(oneOrder);
      } else if (!oneOrder) {
        return res.status(404).json("Pedido não encontrado");
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateOrder(req, res) {
    const { orderId } = req.params;
    let status = req.body.status;
    status.toUpperCase();
    try {
      const penOrder = await database.Orders.findOne({
        where: { id: Number(orderId) },
      });

      if (penOrder && (status === "PREPARING" || status === "PENDING")) {
        const updateOrder = await database.Orders.update(
          { status: status },
          { where: { id: Number(orderId) } }
        );
        return res
          .status(200)
          .json(`Pedido ${orderId} atualizado para ${status}`);
      } else {
        return res
          .status(404)
          .json(`Pedido ${orderId} não encontrado ou status incorreto`);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateToDoneOrder(req, res) {
    const { orderId } = req.params;
    const status = "DONE";
    try {
      const preOrder = await database.Orders.findOne({
        where: { id: Number(orderId) },
      });

      if (preOrder && preOrder.status === "Preparing" || preOrder.status === "Pending") {
        const updateOrder = await database.Orders.update(
          { status: status },
          { where: { id: Number(orderId) } }
        );
        return res
          .status(200)
          .json(`Pedido ${orderId} atualizado para ${status}`);
      } else {
        return res
          .status(404)
          .json(`Pedido ${orderId} não encontrado ou status incorreto`);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = OrderController;
