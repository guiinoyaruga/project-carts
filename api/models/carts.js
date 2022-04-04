'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carts.hasMany(models.Carts_Items,{
        foreignKey: 'cart_id'
      })
      Carts.hasMany(models.Orders,{
        foreignKey: 'cart_id'
      })
    }
  }
  Carts.init({
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};