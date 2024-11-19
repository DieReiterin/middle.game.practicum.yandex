'use strict'
const { default: Emojis } = require('../../models/emojis')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const emojisData = [
        {
          emoji_id: 1,
          emoji_name: 'Smile',
          emoji: '🙂',
        },
        {
          emoji_id: 2,
          emoji_name: 'Heart',
          emoji: '❤️',
        },
        {
          emoji_id: 3,
          emoji_name: 'Thumbs Up',
          emoji: '👍',
        },
        {
          emoji_id: 4,
          emoji_name: 'Sad Face',
          emoji: '🙁',
        },
        {
          emoji_id: 5,
          emoji_name: 'Star',
          emoji: '★',
        },
        {
          emoji_id: 6,
          emoji_name: 'Pizza',
          emoji: '🍕',
        },
        {
          emoji_id: 7,
          emoji_name: 'Fire',
          emoji: '🔥',
        },
        {
          emoji_id: 8,
          emoji_name: 'Gift',
          emoji: '🎁',
        },
        {
          emoji_id: 9,
          emoji_name: 'Bike',
          emoji: '🚴‍♂️',
        },
        {
          emoji_id: 10,
          emoji_name: 'Book',
          emoji: '📚',
        },
      ]

      await Emojis.bulkCreate(emojisData)
    } catch (error) {
      console.error('Ошибка при создании данных для таблицы emojis:', error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('emojis', null, {})
    } catch (error) {
      console.error('Ошибка при удалении данных из таблицы emojis:', error)
    }
  },
}
