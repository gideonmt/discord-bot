module.exports = (sequelize, DataTypes) => {
    const Sequelize = require('sequelize');
    return sequelize.define('modmailBan', {
        user: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        guild: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
}