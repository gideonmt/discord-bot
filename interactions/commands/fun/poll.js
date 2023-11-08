const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { timeToMs } = require('../../../functions/timeToMs');

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
                .setName('end')
                .setDescription('End a poll.')
                .addStringOption(option => option.setName('poll').setDescription('The poll to end.').setRequired(true).setAutocomplete(true))
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
                .addStringOption(option => option.setName('timed').setDescription('End the poll after the given amount of time. (e.g. 1d, 1h)'))
        ),
    async autocomplete(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'end') {
            const focusedValue = interaction.options.getFocused();

            const guild = interaction.guild.id;

            const polls = await getPolls(guild);

            const filtered = polls.filter(poll => poll.question.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice.question, value: choice.question })),
            );
        }
    },
    async execute(interaction) {
        interaction.user.send({ content: ':warning: The poll command is currently in a WIP stage. Expect errors.' });
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'normal') {
            const question = interaction.options.getString('question');
            const results = interaction.options.getBoolean('results') || true;
            const timed = interaction.options.getString('timed') || null;

            const embed = {
                author: {
                    name: interaction.user.username,
                    icon_url: interaction.user.avatarURL(),
                },
                title: question,
            };

            if (timed) {
                const timeMs = timeToMs(timed);
                embed.description += `\n\nEnds in <t:${Math.floor((Date.now() + timeMs) / 1000)}:R>.`;
            }

            if (results) {
                embed.description = `Yes - 0 votes (0%)\nNo - 0 votes 0%\nTotal Votes - 0`;
            } else {
                embed.description = `Vote with the buttons below. You will see the results after voting.`;
            }

            const row = new ActionRowBuilder()
            const button1 = new ButtonBuilder()
                .setCustomId(`poll-${interaction.id}-yes`)
                .setLabel('Yes')
                .setStyle(ButtonStyle.Success);
            const button2 = new ButtonBuilder()
                .setCustomId(`poll-${interaction.id}-no`)
                .setLabel('No')
                .setStyle(ButtonStyle.Danger);
            const endPollButton = new ButtonBuilder()
                .setCustomId(`poll-${interaction.id}-end`)
                .setLabel('End Poll')
                .setStyle(ButtonStyle.Secondary);
            row.addComponents(button1, button2, endPollButton);

            interaction.channel.send({ embeds: [embed], components: [row] })

            return interaction.reply({ content: `Poll created!`, ephemeral: true });
        } else if (subcommand === 'straw') {
            const question = interaction.options.getString('question');
            const multiple = interaction.options.getBoolean('multiple') || false;
            const permissive = interaction.options.getBoolean('permissive') || false;
            const results = interaction.options.getBoolean('results') || true;
            const timed = interaction.options.getString('timed') || null;

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
                description: `Vote with the buttons below.`,
            };

            if (timed) {
                const timeMs = timeToMs(timed);
                embed.description += `\n\nEnds in <t:${Math.floor((Date.now() + timeMs) / 1000)}:R>.`;
            }

            if (results) {
                for (const option of options) {
                    embed.description += `${option} - 0 votes (0%)\n`;
                }
            } else {
                embed.description = `Vote with the buttons below. You will see the results after voting.`;
            }

            const optionSelect = new StringSelectMenuBuilder()
                .setCustomId(`poll-${interaction.id}-options`)
                .setPlaceholder('Select an option')
                .addOptions(
                    options.map(option => new StringSelectMenuOptionBuilder().setLabel(option).setValue(`option-${(options.indexOf(option) + 1).toString()}`)),
            )

            const endPollButton = new ButtonBuilder()
                .setCustomId(`poll-${interaction.id}-end`)
                .setLabel('End Poll')
                .setStyle(ButtonStyle.Secondary);

            const selectRow = new ActionRowBuilder()
                .addComponents(optionSelect);

            const buttonRow = new ActionRowBuilder()
                .addComponents(endPollButton);

            interaction.channel.send({ embeds: [embed], components: [selectRow, buttonRow] })

            interaction.reply({ content: `Poll created!`, ephemeral: true });
        } else if (subcommand === 'ranked') {
            const question = interaction.options.getString('question');
            const permissive = interaction.options.getBoolean('permissive') || false;
            const results = interaction.options.getBoolean('results') || true;
            const timed = interaction.options.getString('timed') || null;

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

            if (timed) {
                const timeMs = timeToMs(timed);
                embed.description += `\n\nEnds in <t:${Math.floor((Date.now() + timeMs) / 1000)}:R>.`;
            }

            if (results) {
                for (const option of options) {
                    embed.description += `${option} - 0 votes (0%)\n`;
                }
            } else {
                embed.description = `Vote with the buttons below. You will see the results after voting.`;
            }

            const row = new ActionRowBuilder()
            const optionSelectButton = new ButtonBuilder()
                .setCustomId(`poll-rank-${interaction.id}-options`)
                .setLabel('Select Ranking')
                .setStyle(ButtonStyle.Primary);

            const endPollButton = new ButtonBuilder()
                .setCustomId(`poll-${interaction.id}-end`)
                .setLabel('End Poll')
                .setStyle(ButtonStyle.Secondary);
            
            row.addComponents(optionSelectButton, endPollButton);

            interaction.channel.send({ embeds: [embed], components: [row] })

            interaction.reply({ content: `Poll created!`, ephemeral: true });
        } else if (subcommand === 'end') {

        }
    }
};