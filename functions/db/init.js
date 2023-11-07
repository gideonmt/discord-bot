// WARNING: Execute node dbInit.js to create the database tables. 
// Unless you make a change to the models, you'll never need to touch the file again. 
// If you change a model, you can execute node dbInit.js --force or node dbInit.js -f to force sync your tables. 
// DANGER: This will empty and remake your model tables. ***

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './data/database.sqlite',
});

require('./models/Reminders')(sequelize, Sequelize.DataTypes);
require('./models/modmailBans')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);