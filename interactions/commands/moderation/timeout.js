const { SlashCommandBuilder } = require('discord.js');
const { timeToMs } = require('../../../functions/timeToMs');

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

        const time = interaction.options.getString('time');

        const timeMs = timeToMs(time);

        if (!timeMs) {
            return interaction.reply({ content: 'You need to input a valid time.', ephemeral: true });
        }

		const member = interaction.options.getMember('target');

        await member.timeout(timeMs);
		return interaction.reply({ content: `You timed out <@${member.user.id}> for **${time}**.`, ephemeral: true });
	},
};
