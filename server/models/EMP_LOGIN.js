const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EMP_LOGIN', {
    username: {
      type: DataTypes.STRING(100),
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    user_password: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'EMP_LOGIN',
    
    timestamps: false
  });
};
