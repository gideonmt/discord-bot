const { ActionRowBuilder } = require("discord.js");
const { pollRemove } = require("../../functions/db/db");

module.exports = (interaction) => {
    const message = interaction.message.id;
    if (interaction.user.username !== interaction.message.embeds[0].author.name) {
        return interaction.reply({ content: "You can only close polls that you created.", ephemeral: true })
    }

    const embed = interaction.message.embeds[0]

    let components = interaction.message.components
    const rows = components.map(row => row)

    rows.forEach(row => {
        row.components.forEach(component => {
            component.data.disabled = true;
        })
    })

    components = rows.map(row => row)

    interaction.message.edit({ content: "This poll has ended.", embeds: [embed], components: components })

    pollRemove(message);

    interaction.reply({ content: `Poll ended!`, ephemeral: true })
}