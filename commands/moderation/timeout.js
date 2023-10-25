const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a member.')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('The time to timeout the member for. Number than units.').setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.permissions.has('ModerateMembers')) {
			return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
		}

        // covert time to milliseconds
        // if time ends in h or hours then multiply by 60 * 60 * 1000
        // if time ends in m or minutes then multiply by 60 * 1000
        // if time ends in s or seconds then multiply by 1000
        // if time ends in ms or milliseconds then multiply by 1
        // if time ends in d or days then multiply by 24 * 60 * 60 * 1000

        const time = interaction.options.getString('time');

        const timeMs = time.endsWith('h') || time.endsWith('hours') ? time.slice(0, -1) * 60 * 60 * 1000
            : time.endsWith('m') || time.endsWith('minutes') ? time.slice(0, -1) * 60 * 1000
            : time.endsWith('s') || time.endsWith('seconds') ? time.slice(0, -1) * 1000
            : time.endsWith('ms') || time.endsWith('milliseconds') ? time.slice(0, -2) * 1
            : time.endsWith('d') || time.endsWith('days') ? time.slice(0, -1) * 24 * 60 * 60 * 1000
            : null;

        if (!timeMs) {
            return interaction.reply({ content: 'You need to input a valid time.', ephemeral: true });
        }

		const member = interaction.options.getMember('target');

        await member.timeout(timeMs);
		return interaction.reply({ content: `You timed out <@${member.user.id}> for **${time}**.`, ephemeral: true });
	},
};
