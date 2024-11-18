import { Model, DataTypes, Association } from 'sequelize'
import sequelize from '../db/db'
import Topic from './topic'
import Emojis from './emojis'

class Message extends Model {
  public message_id!: number
  public topic_id!: number
  public user_name!: string
  public message_text!: string

  public static override associations: {
    emoji: Association<Topic, Emojis>
  }
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

Message.hasOne(Emojis, { foreignKey: 'emoji_id', as: 'emojis' })
Emojis.belongsTo(Message, { foreignKey: 'message_id', as: 'message' })

export default Message
