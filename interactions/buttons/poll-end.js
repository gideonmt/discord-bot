const { ActionRowBuilder } = require("discord.js");
const { pollRemove } = require("../../functions/polls");

module.exports = (interaction, client) => {
    const message = interaction.message.id;
    if (interaction.user.username !== interaction.message.embeds[0].author.name) {
        return interaction.reply({ content: "You can only close polls that you created.", ephemeral: true })
    }

    let description = interaction.message.embeds[0].description
    const descriptionArray = description.split('\n')
    description = descriptionArray.slice(0, descriptionArray.length - 1).join('\n')

    const embed = {
        author: {
            name: interaction.message.embeds[0].author.name,
            icon_url: interaction.message.embeds[0].author.iconURL,
        },
        title: interaction.message.embeds[0].title,
        description: description,
    }

    let components = interaction.message.components
    const rows = components.map(row => row)

    rows.forEach(row => {
        row.components.forEach(component => {
            component.data.disabled = true;
        })
    })

    components = rows.map(row => row)

    interaction.message.edit({ content: "This poll has ended.", embeds: [embed], components: components })

    pollRemove(message, client);

    interaction.reply({ content: `Poll ended!`, ephemeral: true })
}