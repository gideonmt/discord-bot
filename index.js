const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config()


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const handlers = require('./handlers/index');
handlers(client);

const events = require('./events/index');
events(client);

const server = require('./website/server');
server();

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);