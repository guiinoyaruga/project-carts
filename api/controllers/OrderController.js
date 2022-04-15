const database = require("../models");

class OrderController {
  static async showMeOneOrder(req, res) {
    const { orderId } = req.params;
    try {
      const oneOrder = await database.Orders.findOne({
        where: { id: Number(orderId) },
      });
      return res.status(200).json(oneOrder);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateToPreparingOrder(req, res) {
    const { orderId } = req.params;
    const status = "Preparing";
    try {
      const updateOrder = await database.Orders.update(
        { status: status },
        { where: { id: Number(orderId) } }
      );
      return res.status(200).json(`Order atualizada para ${status}`);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateToDoneOrder(req, res) {
    const { orderId } = req.params;
    const status = "Done";
    try {
      const updateOrder = await database.Orders.update(
        { status: status },
        { where: { id: Number(orderId) } }
      );
      return res.status(200).json(`Order atualizada para ${status}`);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = OrderController;
