const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ACCOUNTS', {
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    date_opened: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    current_balance: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ACCOUNTS',
    schema: 'pkdseers_bank',
    timestamps: false,
    indexes: [
      {
        name: "PK__ACCOUNTS__46A222CD13E6D30E",
        unique: true,
        fields: [
          { name: "account_id" },
        ]
      },
    ]
  });
};
