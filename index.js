const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config()


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

const autocomplete = require('./events/autocomplete');
const chatCommand = require('./events/chatCommand');
const buttons = require('./events/buttons')
const modals = require('./events/modals')

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) { chatCommand.handleChatInputCommand(interaction, client) }
	else if (interaction.isAutocomplete()) { autocomplete.handleAutocomplete(interaction, client) }
	else if (interaction.isButton()) { buttons.handleButtons(interaction, client) }
	else if (interaction.isModalSubmit()) { modals.handleModalSubmit(interaction, client) }
});

client.on(Events.GuildMemberAdd, async member => {

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