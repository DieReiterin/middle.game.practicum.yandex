'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emojis', {
      emoji_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      emoji_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emoji: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })

    await queryInterface.addColumn('messages', 'emoji_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'emojis',
        key: 'emoji_id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Messages', 'emoji_id')
    await queryInterface.dropTable('emojis')
  },
}
