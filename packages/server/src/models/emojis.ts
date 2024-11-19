import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/db'

class Emojis extends Model {
  public emoji_id!: number
  public emoji_name!: string
  public emoji!: string
}

Emojis.init(
  {
    emoji_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emoji_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'emojis',
    timestamps: false,
  },
)

export default Emojis
