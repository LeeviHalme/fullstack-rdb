import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class ReadingList extends Model {
  public id!: number;
  public user_id!: number;
}

ReadingList.init(
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
  },
  {
    sequelize,
    modelName: "reading_list",
    underscored: true,
  }
);

export default ReadingList;
