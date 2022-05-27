var DataTypes = require("sequelize").DataTypes;
var seq = require("../db").sequelize;
var _ACCOUNTS = require("./ACCOUNTS");
var _BRANCH = require("./BRANCH");
var _EMP_LOGIN = require("./EMP_LOGIN");
var _TRANSACTION_BANK = require("./TRANSACTION_BANK");
var _customer = require("./customer");

function initModels(sequelize) {
  var BRANCH = _BRANCH(sequelize, DataTypes);
  var EMP_LOGIN = _EMP_LOGIN(sequelize, DataTypes);
  var TRANSACTION_BANK = _TRANSACTION_BANK(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var ACCOUNTS = _ACCOUNTS(sequelize, DataTypes);

  TRANSACTION_BANK.belongsTo(ACCOUNTS, { as: "account", foreignKey: "account_id"});
  ACCOUNTS.hasMany(TRANSACTION_BANK, { as: "TRANSACTION_BANKs", foreignKey: "account_id"});
  TRANSACTION_BANK.belongsTo(BRANCH, { as: "branch", foreignKey: "branch_id"});
  BRANCH.hasMany(TRANSACTION_BANK, { as: "TRANSACTION_BANKs", foreignKey: "branch_id"});
  ACCOUNTS.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(ACCOUNTS, { as: "ACCOUNTs", foreignKey: "customer_id"});

  return {
    ACCOUNTS,
    BRANCH,
    EMP_LOGIN,
    TRANSACTION_BANK,
    customer,
  };
}

module.exports = initModels(seq)
