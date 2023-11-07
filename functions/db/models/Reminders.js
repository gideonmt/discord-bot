module.exports = (sequelize, DataTypes) => {
    const Sequelize = require('sequelize');
    return sequelize.define('reminder', {
        time: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
};