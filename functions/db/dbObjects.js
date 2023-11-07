const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './data/database.sqlite',
});

const Reminders = require('./models/Reminders')(sequelize, DataTypes);

module.exports = { Reminders };