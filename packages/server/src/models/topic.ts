import { Model, DataTypes, Association } from 'sequelize'
import sequelize from '../db/db'
import Message from './message'

class Topic extends Model {
  public topic_id!: number
  public topic_name!: string
  public topic_descr!: string
  public messages_count!: number
  public messages: Message[] = []

  public static override associations: {
    messages: Association<Topic, Message>
  }
}

Topic.init(
  {
    topic_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topic_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic_descr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    messages_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'topics',
    timestamps: false,
  },
)

Topic.hasMany(Message, { foreignKey: 'topic_id', as: 'messages' })
Message.belongsTo(Topic, { foreignKey: 'topic_id', as: 'topic' })

export default Topic
