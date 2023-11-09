const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { timeToMs } = require('../../../functions/timeToMs');
const { pollAdd } = require('../../../functions/db/db');
const { MessageManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('normal')
                .setDescription('Create a normal yes or no poll.')
                .addStringOption(option => option.setName('question').setDescription('The question to ask.').setRequired(true))
                .addBooleanOption(option => option.setName('results').setDescription('Show results to users without voting first.'))
                .addStringOption(option => option.setName('timed').setDescription('End the poll after the given amount of time. (e.g. 1d, 1h)'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('straw')
                .setDescription('Create a strawpoll.')
                .addStringOption(option => option.setName('question').setDescription('The question to ask.').setRequired(true))
                .addStringOption(option => option.setName('option-1').setDescription('Option 1').setRequired(true))
                .addStringOption(option => option.setName('option-2').setDescription('Option 2').setRequired(true))
                .addStringOption(option => option.setName('option-3').setDescription('Option 3'))
                .addStringOption(option => option.setName('option-4').setDescription('Option 4'))
                .addStringOption(option => option.setName('option-5').setDescription('Option 5'))
                .addStringOption(option => option.setName('option-6').setDescription('Option 6'))
                .addStringOption(option => option.setName('option-7').setDescription('Option 7'))
                .addStringOption(option => option.setName('option-8').setDescription('Option 8'))
                .addStringOption(option => option.setName('option-9').setDescription('Option 9'))
                .addStringOption(option => option.setName('option-10').setDescription('Option 10'))
                .addBooleanOption(option => option.setName('multiple').setDescription('Allow multiple options to be selected.'))
                .addBooleanOption(option => option.setName('permissive').setDescription('Allow users to add their own options.'))
                .addBooleanOption(option => option.setName('results').setDescription('Show results to users without voting first.'))
                .addStringOption(option => option.setName('timed').setDescription('End the poll after the given amount of time. (e.g. 1d, 1h)'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ranked')
                .setDescription('Create a ranked poll.')
                .addStringOption(option => option.setName('question').setDescription('The question to ask.').setRequired(true))
                .addStringOption(option => option.setName('option-1').setDescription('Option 1').setRequired(true))
                .addStringOption(option => option.setName('option-2').setDescription('Option 2').setRequired(true))
                .addStringOption(option => option.setName('option-3').setDescription('Option 3'))
                .addStringOption(option => option.setName('option-4').setDescription('Option 4'))
                .addStringOption(option => option.setName('option-5').setDescription('Option 5'))
                .addStringOption(option => option.setName('option-6').setDescription('Option 6'))
                .addStringOption(option => option.setName('option-7').setDescription('Option 7'))
                .addStringOption(option => option.setName('option-8').setDescription('Option 8'))
                .addStringOption(option => option.setName('option-9').setDescription('Option 9'))
                .addStringOption(option => option.setName('option-10').setDescription('Option 10'))
                .addBooleanOption(option => option.setName('permissive').setDescription('Allow users to add their own options.'))
                .addBooleanOption(option => option.setName('results').setDescription('Show results to users without voting first.'))
                .addStringOption(option => option.setName('timed').setDescription('Set the poll duration, e.g., 1d or 1h (default = 7d).'))
        ),
    async execute(interaction) {
        interaction.user.send({ content: ':warning: The poll command is currently in a WIP stage. Expect errors.' });
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'normal') {
            const question = interaction.options.getString('question');
            const results = interaction.options.getBoolean('results');
            const timed = interaction.options.getString('timed') || "7d";
            const type = 'normal';
            const options = ['yes', 'no']

            const embed = {
                author: {
                    name: interaction.user.username,
                    icon_url: interaction.user.avatarURL(),
                },
                title: question,
            };

            const timeMs = timeToMs(timed);

            const endTime = Date.now() + timeMs;
            embed.description += `\n\nEnds in <t:${Math.floor(endTime / 1000)}:R>.`;

            if (results === null || results === true) {
                embed.description = `Yes - 0 votes (0%)\nNo - 0 votes 0%\nTotal Votes - 0`;
            } else {
                embed.description = `Yes\nNo\n\nYou will see the results after voting.`;
            }

            const row = new ActionRowBuilder()
            const button1 = new ButtonBuilder()
                .setCustomId(`poll-vote-yes`)
                .setLabel('Yes')
                .setStyle(ButtonStyle.Success);

            const button2 = new ButtonBuilder()
                .setCustomId(`poll-vote-no`)
                .setLabel('No')
                .setStyle(ButtonStyle.Danger);

            const endPollButton = new ButtonBuilder()
                .setCustomId(`poll-end`)
                .setLabel('End Poll')
                .setStyle(ButtonStyle.Secondary);

            row.addComponents(button1, button2, endPollButton);

            interaction.channel.send({ embeds: [embed], components: [row] }).then(fullMessage => {
                const message = fullMessage.id;
                pollAdd(message, options, endTime, type)
            });

            return interaction.reply({ content: `Poll created!`, ephemeral: true });
        } else if (subcommand === 'straw') {
            const question = interaction.options.getString('question');
            const multiple = interaction.options.getBoolean('multiple') || false;
            const permissive = interaction.options.getBoolean('permissive') || false;
            const results = interaction.options.getBoolean('results');
            const timed = interaction.options.getString('timed') || "7d";
            const type = 'straw';

            let options = [];
            for (let i = 1; i <= 10; i++) {
                const option = interaction.options.getString(`option-${i}`);
                if (option) {
                    options.push(option);
                }
            }

            const embed = {
                author: {
                    name: interaction.user.username,
                    icon_url: interaction.user.avatarURL(),
                },
                title: question,
            };

            if (results === null || results === true) {
                for (const option of options) {
                    embed.description += `${option} - 0 votes (0%)\n`;
                } if (permissive === true) {
                    embed.description += `Other - 0 votes (0%)\n`
                }
            } else {
                for (const option of options) {
                    embed.description += `${option}`;
                }
                embed.description += `\n\nYou will see the results after voting.`;
            }

            const timeMs = timeToMs(timed);

            const endTime = Date.now() + timeMs;
            embed.description += `\nEnds in <t:${Math.floor(endTime / 1000)}:R>.`

            let selectOptions = [];
            for (const option in options) {
                selectOptions.push(new StringSelectMenuOptionBuilder().setLabel(options[option]).setValue(`option-${(Number(option) + 1).toString()}`))
            }

            if (permissive === true) {
                selectOptions.push(new StringSelectMenuOptionBuilder().setLabel('Other').setValue('option-other'))
            }

            const optionSelect = new StringSelectMenuBuilder()
                .setCustomId(`poll-options`)
                .setPlaceholder('Select an option')
                .addOptions(selectOptions);

            console.log(selectOptions)

            console.log(optionSelect.options)

            const endPollButton = new ButtonBuilder()
                .setCustomId(`poll-end`)
                .setLabel('End Poll')
                .setStyle(ButtonStyle.Secondary);

            const selectRow = new ActionRowBuilder()
                .addComponents(optionSelect);

            const buttonRow = new ActionRowBuilder()
                .addComponents(endPollButton);

            interaction.channel.send({ embeds: [embed], components: [selectRow, buttonRow] }).then(fullMessage => {
                const message = fullMessage.id;
                pollAdd(message, options, endTime, type)
            });

            interaction.reply({ content: `Poll created!`, ephemeral: true });
        } else if (subcommand === 'ranked') {
            const question = interaction.options.getString('question');
            const permissive = interaction.options.getBoolean('permissive') || false;
            const results = interaction.options.getBoolean('results');
            const timed = interaction.options.getString('timed') || "7d";

            let options = [];
            for (let i = 1; i <= 10; i++) {
                const option = interaction.options.getString(`option-${i}`);
                if (option) {
                    options.push(option);
                }
            }

            if (permissive === true) {
                options.push('other');
            }

            const embed = {
                author: {
                    name: interaction.user.username,
                    icon_url: interaction.user.avatarURL(),
                },
                title: question,
            };


            const timeMs = timeToMs(timed);
            const endTime = Date.now() + timeMs;
            embed.description += `\n\nEnds in <t:${Math.floor(endTime / 1000)}:R>.`;

            if (results === null || results === true) {
                for (const option of options) {
                    embed.description += `${option} - 0 votes (0%)\n`;
                }
            } else {
                for (const option of options) {
                    embed.description += `${option}`;
                }
                embed.description += `\n\nYou will see the results after voting.`;
            }

            const row = new ActionRowBuilder()
            const optionSelectButton = new ButtonBuilder()
                .setCustomId(`poll-rank-options`)
                .setLabel('Select Ranking')
                .setStyle(ButtonStyle.Primary);

            const endPollButton = new ButtonBuilder()
                .setCustomId(`poll-end`)
                .setLabel('End Poll')
                .setStyle(ButtonStyle.Secondary);

            row.addComponents(optionSelectButton, endPollButton);

            interaction.channel.send({ embeds: [embed], components: [row] })

            interaction.reply({ content: `Poll created!`, ephemeral: true });
        } else {
            return interaction.reply({ content: 'Please select a valid poll type.', ephemeral: true });
        }
    }
};