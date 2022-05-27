const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TRANSACTION_BANK', {
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ACCOUNTS',
        key: 'account_id'
      }
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BRANCH',
        key: 'branch_id'
      }
    },
    date_of_transaction: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.REAL,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TRANSACTION_BANK',
    schema: 'pkdseers_bank',
    timestamps: false,
    indexes: [
      {
        name: "PK__TRANSACT__85C600AF185688B1",
        unique: true,
        fields: [
          { name: "transaction_id" },
        ]
      },
    ]
  });
};
