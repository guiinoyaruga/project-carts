"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Carts_Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      produto_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Products", key: "id" },
      },
      cart_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Carts", key: "id" },
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Carts_Items");
  },
};
