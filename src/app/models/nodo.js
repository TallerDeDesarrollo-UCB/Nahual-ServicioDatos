const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Nodo = sequelize.define('Nodo', {
    'id': {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    'nombre': DataTypes.STRING
  });
  return Nodo;
}
