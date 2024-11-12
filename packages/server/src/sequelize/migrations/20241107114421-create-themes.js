'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('themes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await queryInterface.addIndex('themes', ['name']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('themes');
  },
};
