module.exports = (sequelize, DataTypes) => {
    const Sequelize = require('sequelize');
    return sequelize.define('modmailBan', {
        user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        guild: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
}