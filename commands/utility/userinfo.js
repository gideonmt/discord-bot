const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Provides information about the user.')
		.addUserOption(option => option.setName('target').setDescription('The member you want to get information about')),
	async execute(interaction) {
		const member = interaction.options.getMember('target') || interaction.member;

		const roles = member.roles.cache
			.filter((role) => role.name !== '@everyone')
			.map((role) => `<@&${role.id}>`)
			.join(', ');

		const activities = member.presence?.activities || []

		const embed = {
			"author": {
				"name": member.user.tag,
				"icon_url": member.user.displayAvatarURL()
			},
			"color": member.displayColor === "#000000" ? "#ffffff" : member.displayColor,
			"description": activities.map((x, i) => `**${x.type}**: \`${x.name || "None"} : ${x.details || "None"} : ${x.state || "None"}\``).join("\n"),
			"fields": [
				{
					"name": "Joined Server At",
					"value": member.joinedAt.toLocaleString(),
					"inline": true
				},
				{
					"name": "Account Created At",
					"value": member.user.createdAt.toLocaleString(),
					"inline": true
				},
				{
					"name": "Common Information",
					"value": [
						`Display Name: \`${member.displayName}\``,
						`User ID: \`${member.user.id}\``,
						`Pending Member: \`${member.pending ? 'Yes' : 'No'}\``,
						`Booster: \`${member.premiumSince ? 'since ' + member.premiumSince.toLocaleString() : 'Nope'}\``,
					].join("\n")
				},
				{
					name: 'Roles',
					value: roles,
					inline: false,
				}
			]
		};

		await interaction.reply({ embeds: [embed] });
	},
};
