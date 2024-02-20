module.exports = (sequelize, DataTypes) => {
    const Sequelize = require('sequelize');
    return sequelize.define('reminder', {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
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