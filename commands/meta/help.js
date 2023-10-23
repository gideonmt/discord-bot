const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get list of all command and even get to know every command detials.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to get information on.')
                .setAutocomplete(true)),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const fs = require('fs');
        const path = require('path');

        function listAndRemoveJsFiles(directoryPath) {
            const files = fs.readdirSync(directoryPath);
            const choices = [];

            files.forEach((file) => {
                const filePath = path.join(directoryPath, file);

                if (fs.statSync(filePath).isDirectory()) {
                    choices.push(...listAndRemoveJsFiles(filePath));
                } else if (file.endsWith('.js')) {
                    const fileNameWithoutExtension = file.replace('.js', '');
                    choices.push(fileNameWithoutExtension);
                }
            });

            return choices;
        }

        const rootDirectory = path.join(__dirname, '..');

        const choices = listAndRemoveJsFiles(rootDirectory);
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction, client) {
        const commandName = interaction.options.getString('command');

        if (!commandName) {
            const fs = require('fs');
            const path = require('path');

            const rootDirectory = path.join(__dirname, '..');
            
            function getFolderInfo(directory) {
                const folders = fs.readdirSync(directory);
                const folderInfo = [];

                folders.forEach((folder) => {
                    const folderPath = path.join(directory, folder);
                    const stats = fs.statSync(folderPath);

                    if (stats.isDirectory()) {
                        const jsFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
                        const filesValue = jsFiles.map(file => file.replace('.js', '')).join(', ');
                        folderInfo.push({
                            name: folder.charAt(0).toUpperCase() + folder.slice(1),
                            value: filesValue
                        });
                    }
                });

                return folderInfo;
            }

            const folderInfo = getFolderInfo(rootDirectory);

            const embed = {
                title: 'Help',
                description: 'List of all slash commands. Specify a command for more information in the command option.',
                fields: folderInfo.map(folder => ({
                    name: folder.name,
                    value: folder.value
                }))
            };
            return interaction.reply({ embeds: [embed] });
        }

        const command = client.commands.get(commandName.toLowerCase());

        if (!command) {
            return interaction.reply('Command not found.');
        }

        const commandDescription = command.data.description;
        const commandDataOptions = command.data.options;
        const commandOptions = commandDataOptions.map(option => `[${option.name}]`).join(`, `)

        const embed = {
            title: commandName,
            description: commandDescription,
            fields: [
                {
                    name: `Usage`,
                    value: `/${commandName} ${commandOptions}`
                }
            ]
        }

        interaction.reply({ embeds: [embed] });
    },
};