"use strict";

const Sequelize = require("sequelize");

const sequelize = new Sequelize("bn", "fares", "232001", {
  host: "DESKTOP-J0N0C20",
  port: 1433,
  dialect: "mssql",
  dialectOptions: {
    encrypt: true,
  },
});

const db = {};

db.sequelize = sequelize;

module.exports = db;
