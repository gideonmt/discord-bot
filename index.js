const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();

const client = new Client({
	intents: [Object.keys(GatewayIntentBits)],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// ------------ INFO MESSAGE ------------
// Delete this section to disable the info message on boot
const infoMessage = require('./functions/infoMessage');
infoMessage();
// --------------------------------------

const handlers = require('./handlers/index');
handlers(client);

const events = require('./events/index');
events(client);

const server = require('./website/server');
server(client);

const activityStatus = require('./functions/activityStatus');
setInterval(() => {
	activityStatus(client);
}, 10000);

const { checkReminders } = require('./functions/reminders');
setInterval(() => {
	checkReminders(client);
}, 1000);

const { checkPolls } = require('./functions/polls');
setInterval(() => {
	checkPolls(client);
}, 1000);

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);