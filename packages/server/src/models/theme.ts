import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/db'

class Theme extends Model {
  public id!: number
  public name!: string
}

Theme.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'themes',
    timestamps: false,
  },
)

export default Theme
