import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AcaoPreventiva = sequelize.define("AcaoPreventiva", {
  tipoAcao: {
    type: DataTypes.STRING,
    allowNull: false
  },

  quantidadeAfetada: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "PLANEJADA"
  },

  dataPlanejada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  dataRealizada: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },

  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

export default AcaoPreventiva;