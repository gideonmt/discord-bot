const { SlashCommandBuilder } = require('discord.js');
const { addWarn, removeWarn, listWarns } = require('../../../functions/warns');

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
        if (subcommand === 'remove') {
            const focusedValue = interaction.options.getFocused();

            const guild = interaction.guild.id;

            const warns = await listWarns(guild);

            let warnList = [];
            for (const warn of warns) {
                const username = (await interaction.guild.members.fetch(warn.user)).user.username;
                const userId = warn.user;
                const reason = warn.reason;
                
                warnList.push([`${username}, ${reason}`, `${userId}, ${warn.id}`]);
            }

            const filtered = warnList.filter(warn => warn[0].startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice[0].length > 100 ? choice[0].substring(0, 97) + "..." : choice[0], value: choice[1] })),
            );
        }
	},
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		if (!interaction.member.permissions.has('ModerateMembers')) {
			return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
		}

		if (subcommand === 'list') {
            const target = interaction.options.getMember('target');
            const guild = interaction.guild.id;

            const warns = await listWarns(guild, target.user.id);

            if (warns.length === 0) {
                return interaction.reply({ content: "This user doesn't have any warns.", ephemeral: true });
            }

            const embed = {
                title: `Warns for ${target.user.username}`,
                fields: [],
            };

            for (const warn of warns) {
                embed.fields.push({
                    name: `Warned for ${warn.reason.length > 245 ? warn.reason.substring(0, 242) + "..." : choice[0]}`,
                    value: `Created at <t:${Math.round(warn.createdAt.getTime() / 1000)}:d>`,
                    inline: true,
                })
            }

            interaction.reply({ embeds: [embed], ephemeral: true });
		} else if (subcommand === 'remove') {
			const warn = interaction.options.getString('warn');
            const guild = interaction.guild.id;
            const memberId = warn.split(', ')[0];
            const id = warn.split(', ')[1];
            
            await removeWarn(memberId, guild, id);

            interaction.reply({ content: `Removed warn from <@${memberId}>.`, ephemeral: true });
		} else if (subcommand === 'add') {
			const member = interaction.options.getMember('target');
			const reason = interaction.options.getString('reason');
            const guild = interaction.guild.id;

            await addWarn(member.user.id, guild, reason);

            interaction.reply({ content: `Added warn \`${reason}\` to <@${member.user.id}>.`, ephemeral: true });
		}
	},
};