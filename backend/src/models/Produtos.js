import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Produto = sequelize.define("Produto", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Produto;