const { SlashCommandBuilder } = require('discord.js');
const { addReminder, removeReminder, getReminders } = require('../../../functions/db/db');
const { timeToMs } = require('../../../functions/timeToMs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('Reminds you about something.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Lists your reminders.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Removes a reminder.')
                .addStringOption(option => option.setName('reminder').setDescription('The reminder you want to remove.').setRequired(true).setAutocomplete(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Adds a reminder.')
                .addStringOption(option => option.setName('time').setDescription('How long to wait before reminding you.').setRequired(true))
                .addStringOption(option => option.setName('message').setDescription('The message to remind you with.').setRequired(true))
        ),
    async autocomplete(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'remove') {
            const focusedValue = interaction.options.getFocused();

            const user = interaction.user.id;

            const reminders = await getReminders(user);

            const filtered = reminders.filter(reminder => reminder.message.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice.message, value: choice.message })),
            );
        }
    },
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'list') {
            const user = interaction.user.id;
            const reminders = await getReminders(user);

            if (reminders.length === 0) {
                return interaction.reply({ content: "You don't have any reminders.", ephemeral: true });
            }

            const embed = {
                title: `Reminders`,
                // list of reminders in description
                description: reminders.map(reminder => {
                    return `**Message:** ${reminder.message}\n**Time left:** <t:${Math.floor(reminder.time / 1000)}:R>\n`
                }).join('\n'),
            };

            return await interaction.reply({ embeds: [embed] });
        } else if (subcommand === 'remove') {
            const reminderInput = interaction.options.getString('reminder');
            const reminders = await getReminders(interaction.user.id);
            const reminder = reminders.find(reminder => reminder.message === reminderInput);

            if (!reminder) {
                return interaction.reply({ content: "You don't have a reminder with that message.", ephemeral: true });
            }

            const user = interaction.user.id;
            const message = reminder.message;

            await removeReminder(user, message);

            return interaction.reply({ content: `Removed the reminder with the message: ${reminder.message}`, ephemeral: true });
        } else if (subcommand === 'add') {
            const time = interaction.options.getString('time');
            const message = interaction.options.getString('message');
            const user = interaction.user;

            let timeMs = timeToMs(time);

            if (timeMs < 120000) {
                return interaction.reply({ content: "You can't set a reminder for less than 2 minutes.", ephemeral: true })
            } else if (timeMs > 31536000000) {
                return interaction.reply({ content: "You can't set a reminder for more than a year.", ephemeral: true })
            }

            const timestamp = Date.now() + timeMs;

            const reminder = await addReminder(user, timestamp, message)

            const embed = {
                title: `Reminder`,
                description: `I will remind you in ${time} with the message ${reminder.message}.`,
            };

            interaction.reply({ embeds: [embed] });
        }
    },
};