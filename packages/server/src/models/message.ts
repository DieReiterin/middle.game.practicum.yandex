import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/db'
import Topic from './topic'

class Message extends Model {
  public message_id!: number
  public topic_id!: number
  public user_name!: string
  public message_text!: string
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

export default Message