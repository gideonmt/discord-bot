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

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
	if (message.content.toLowerCase().includes('!clearmodmail')) {
		message.guild.channels.cache.forEach(channel => {
			if (channel.name === 'modmail') {
				channel.delete();
			}
		});
	}
});

client.login(process.env.TOKEN);