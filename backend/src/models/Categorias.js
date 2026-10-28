
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Categoria = sequelize.define("Categoria", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default Categoria;
