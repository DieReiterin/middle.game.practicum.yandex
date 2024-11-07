'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('themes', [
      { id: 1, name: 'Светлая' },
      { id: 2, name: 'Темная' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('themes', null, {});
  }
};
