const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    house_no: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "UQ__customer__F3DBC572B0BE6E40"
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'customer',
    
    timestamps: false,
    indexes: [
      {
        name: "PK__customer__CD65CB85EBA55659",
        unique: true,
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "UQ__customer__F3DBC572B0BE6E40",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
