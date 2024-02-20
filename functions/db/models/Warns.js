module.exports = (sequelize, DataTypes) => {
    const Sequelize = require('sequelize');
    return sequelize.define('warn', {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
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