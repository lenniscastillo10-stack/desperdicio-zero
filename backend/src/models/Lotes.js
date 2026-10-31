import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Lote = sequelize.define("Lote", {
  codigoLote: {
    type: DataTypes.STRING,
    allowNull: true
  },

  quantidadeInicial: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  quantidadeDisponivel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  custoUnitarioCentavos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  dataEntrada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  dataValidade: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

export default Lote;