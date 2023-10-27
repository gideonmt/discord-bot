const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Provides detailed information about the bot.'),
  async execute(interaction, client) {
    const embed = {
      title: `${client.user.username} Info`,
	  description: `An open source general purpose Discord bot designed for all types of communities.`,
      thumbnail: {
        url: client.user.displayAvatarURL(),
      },
      fields: [
        {
          name: 'Tech Stats',
          value: `Ping: ${Math.round(client.ws.ping)}ms\nUptime: ${formatUptime(client.uptime)}`,
          inline: true,
        },
        {
          name: 'Source Code',
          value: 'Veiw the [source code here](https://github.com/gideonmt/discord-bot).',
          inline: true,
        },
        {
          name: 'Servers',
          value: client.guilds.cache.size,
          inline: true,
        }
      ],
      footer: {
        text: 'Type /help for assistance.',
        icon_url: client.user.displayAvatarURL(),
      },
    };

    interaction.reply({ embeds: [embed] });
  },
};

function formatUptime(uptime) {
  const seconds = Math.floor(uptime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
}
