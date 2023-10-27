const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qrcode')
		.setDescription('Gererates a QR code from the given data.')
        .addStringOption(option => option.setName('data').setDescription('The data to convert to a QR code.').setRequired(true)),
	async execute(interaction) {
        const data = interaction.options.getString('data').replace(/ /g,"%20");
        const link = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;

        const embed = {
            title: `QR Code for ${data}`,
            url: link,
            image: {
                url:link,
            }
        };

		return interaction.reply({ embeds: [embed] });
	},
};
