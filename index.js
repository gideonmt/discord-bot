const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();

const client = new Client({
	intents: [Object.keys(GatewayIntentBits)],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const handlers = require('./handlers/index');
handlers(client);

const events = require('./events/index');
events(client);

const server = require('./website/server');
server();

const activityStatus = require('./functions/activityStatus');
setInterval(() => {
	activityStatus(client);
}, 10000);

const { checkReminders } = require('./functions/db/db');
setInterval(() => {
	checkReminders(client);
}, 1000);

// check polls
const { checkPolls } = require('./functions/db/db');
setInterval(() => {
	checkPolls(client);
}, 1000);

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);