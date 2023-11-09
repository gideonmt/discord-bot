module.exports = (sequelize, DataTypes) => {
    const Sequelize = require('sequelize');
    return sequelize.define('polls', {
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        endTime: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        options: {
            type: Sequelize.JSON,
            allowNull: false,
        },
        type: {
            type: Sequelize.ENUM,
            values: ['normal', 'straw', 'ranked'],
            allowNull: false,
        },
    });
}