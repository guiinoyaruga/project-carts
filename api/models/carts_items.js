'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Carts_Items.belongsTo(models.Products),{
      foreignKey: 'products_id'
    }
    Carts_Items.belongsTo(models.Carts), {
      foreignKey: 'cart_id'
    }
    }
  }
  Carts_Items.init({
    qty: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Carts_Items',
  });
  return Carts_Items;
};