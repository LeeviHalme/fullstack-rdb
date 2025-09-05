import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class ReadingListItem extends Model {
  public id!: number;
  public blog_id!: number;
  public reading_list_id!: number;
  public read!: boolean;
}

ReadingListItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
    },
    reading_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "reading_lists",
        key: "id",
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "reading_list_item",
    underscored: true,
  }
);

export default ReadingListItem;
