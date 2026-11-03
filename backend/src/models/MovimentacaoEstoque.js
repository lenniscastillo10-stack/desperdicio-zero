import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const MovimentacaoEstoque = sequelize.define("MovimentacaoEstoque", {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  loteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default MovimentacaoEstoque;
