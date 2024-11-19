'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('themes', [
        { id: 1, name: 'Светлая' },
        { id: 2, name: 'Темная' },
      ]);
    } catch (error) {
      console.error('Ошибка при создании данных для таблицы themes:', error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('themes', null, {});
    } catch (error) {
      console.error('Ошибка при удалении данных из таблицы themes:', error)
    }
  },
}
