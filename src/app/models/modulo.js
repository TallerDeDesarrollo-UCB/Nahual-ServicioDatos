module.exports = (sequelize, DataTypes) => {
  const Modulo = sequelize.define('Modulo', {
    'id': {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    'nombre': DataTypes.STRING
  });
  return Modulo;
}