import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class Blog extends Model {
  public id!: number;
  public author!: string;
  public url!: string;
  public title!: string;
  public likes!: number;
  public userId!: number;
  public year!: number;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isCorrectYear(value: number) {
          const currentYear = new Date().getFullYear();
          if (value < 1991 || value > currentYear) {
            throw new Error("Year must be between 1991 and the current year.");
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "blog",
    timestamps: false,
    underscored: true,
  }
);

export default Blog;
