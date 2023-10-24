const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Bot settings.'),
  async execute(interaction) {
    const embed = {
      title: `Settings`,
      description: `Change your bot settings here. Click the buttons below to change the settings of different modules`
    }
    const welcomeButton = new ButtonBuilder()
      .setCustomId('settings-welcome')
      .setLabel('Member Join Event')
      .setStyle(ButtonStyle.Secondary);

    const autoreplyButton = new ButtonBuilder()
      .setCustomId('settings-autoreply')
      .setLabel('Autoreplys')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
      .addComponents(welcomeButton, autoreplyButton);

      interaction.reply({ embeds: [embed], components: [row] })
  }
};