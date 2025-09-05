import { Model, DataTypes } from "sequelize";

import { sequelize } from "../utils/db";

class User extends Model {
  public id!: number;
  public username!: string;
  public name!: string;
  public disabled!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "user",
  }
);

export default User;
