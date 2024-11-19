import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/db'
import Topic from './topic'
import Emojis from './emojis'

class Message extends Model {
  public message_id!: number
  public topic_id!: number
  public user_name!: string
  public message_text!: string
  public emoji_id?: number
}

Message.init(
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'topics',
        key: 'topic_id',
      },
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emoji_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'emojis',
        key: 'emoji_id',
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: false,
    hooks: {
      async afterCreate(message) {
        await Topic.increment('messages_count', {
          where: { topic_id: message.topic_id },
        })
      },
      async afterDestroy(message) {
        await Topic.decrement('messages_count', {
          where: { topic_id: message.topic_id },
        })
      },
    },
  },
)

Message.belongsTo(Emojis, { foreignKey: 'emoji_id' })
Emojis.hasMany(Message, { foreignKey: 'emoji_id' })

export default Message
