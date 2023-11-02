module.exports = async (interaction) => {
    const userId = interaction.customId.split("-")[2];

    const replyMessage = interaction.fields.getTextInputValue("replyModalInput")

    const embed = {
        author: {
            name: `${interaction.user.tag}`,
            icon_url: `${interaction.user.displayAvatarURL()}`
        },
        color: 0x00ff00,
        description: replyMessage
    }

    const user = await interaction.client.users.fetch(userId);
    const dmChannel = await user.createDM();
    await dmChannel.send({ content: "Moderator Reply!", embeds: [embed] });

    await interaction.reply({ content: `Replying to ${user.tag} with message ${replyMessage}`, ephemeral: true })
}