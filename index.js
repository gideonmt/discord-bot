const fs = require('node:fs');
const path = require('node:path');
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

// Handlers
const autocomplete = require('./handlers/autocomplete')
const commands = require('./handlers/commands')
const buttons = require('./handlers/buttons')
const modals = require('./handlers/modals')

commands.handleCommands(client);

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) { commands.handleChatInputCommand(interaction, client) }
	else if (interaction.isAutocomplete()) { autocomplete.handleAutocomplete(interaction, client) }
	else if (interaction.isButton()) { buttons.handleButtons(interaction, client) }
	else if (interaction.isModalSubmit()) { modals.handleModalSubmit(interaction, client) }
});

const memberJoin = require('./events/memberJoin');
const memberLeave = require('./events/memberLeave');

client.on(Events.GuildMemberAdd, async member => {
	memberJoin.handleMemberJoin(member, client);
});

client.on(Events.GuildMemberRemove, async member => {
	memberLeave.handleMemberLeave(member, client);
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.enable('trust proxy');
app.set("etag", false);
app.use(express.static(__dirname + '/website'));

app.use(express.static(__dirname + '/website'));
app.use(bodyParser.json());

app.get('/api/settings', (req, res) => {
	const data = fs.readFileSync('settings.json');
	const settings = JSON.parse(data);
	res.json(settings);
});

app.post('/api/settings', (req, res) => {
	const updatedSettings = req.body;
	fs.writeFileSync('settings.json', JSON.stringify(updatedSettings, null, 2));
	res.json({ message: 'Settings updated successfully' });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

client.login(process.env.TOKEN);