import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/db'
import Theme from './theme'

class UserTheme extends Model {
  public user_id!: string
  public theme_id!: number

  public Theme?: Theme
}

UserTheme.init(
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    theme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'themes',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'user_themes',
    timestamps: false,
  },
)

// Definition of relationships
Theme.hasMany(UserTheme, { foreignKey: 'theme_id' })
UserTheme.belongsTo(Theme, { foreignKey: 'theme_id' })

export default UserTheme
