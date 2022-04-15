'use strict';
 let cart = null;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
   
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

