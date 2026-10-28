import { Sequelize } from "sequelize" ;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./banco.sqlite",
  logging: false
});

export default sequelize