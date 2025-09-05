import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class Session extends Model {
  public id!: number;
  public user_id!: number;
  public token!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "session",
    underscored: true,
  }
);

export default Session;
