const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Manage warns.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Warn a member.')
				.addUserOption(option => option.setName('target').setDescription('The member to warn').setRequired(true))
				.addStringOption(option => option.setName('reason').setDescription('The reason for the warn.').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Remove a warn.')
                .addStringOption(option => option.setName('warn').setDescription('The warn to remove (username, warn message).').setRequired(true).setAutocomplete(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('list')
				.setDescription('List warnings.')
                .addUserOption(option => option.setName('target').setDescription('The member to list warnings for.').setRequired(true))
		),
	async autocomplete(interaction) {
		const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'remove' && !interaction.member.permissions.has('ModerateMembers')) {
            const focusedValue = interaction.options.getFocused();

            const user = interaction.user.id;
        }
	},
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		if (!interaction.member.permissions.has('ModerateMembers')) {
			return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
		}

		if (subcommand === 'list') {
            const target = interaction.options.getMember('target');

            interaction.reply({ content: `WIP Command`, ephemeral: true });
		} else if (subcommand === 'remove') {
			const target = interaction.options.getString('target');

            interaction.reply({ content: `WIP Command`, ephemeral: true });
		} else if (subcommand === 'add') {
			const member = interaction.options.getMember('target');
			const reason = interaction.options.getString('reason');

            interaction.reply({ content: `WIP Command`, ephemeral: true });
		}
	},
};