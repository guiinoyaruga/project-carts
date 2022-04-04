"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Suco 350ml",
          price: 4.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Porção de batata 500g",
          price: 12.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hamburguer",
          price: 10.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Frango com batata 300g",
          price: 12.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "X-Tudo e Refri 250ml",
          price: 16.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Açaí 500ml",
          price: 17.9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Milkshake 350ml",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
