'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_themes', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      theme_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'themes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.addIndex('user_themes', ['user_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_themes');
  },
};
