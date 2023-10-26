const settings = require('../settings.json');
const starboardEnabled = settings.starboardEnabled;
const starboardChannelId = settings.starboardChannel;
const starboardEmojisInput = settings.starboardEmojis;
const starboardReactions = settings.starboardReactions;

module.exports = {
    handleStarboard: async (reaction, client) => {
        if (!starboardEnabled || !starboardChannel || !starboardEmojis || !starboardReactions) return;

        const message = reaction.message;
        const channel = message.channel;

        if (channel.id === starboardChannel) return;

        const starboardChannel = client.channels.cache.get(starboardChannelId);

        if (!starboardChannel) return;

        const starboardEmojis = starboardEmojisInput.split(',');

        if (!starboardEmojis.includes(reaction.emoji.name)) return;

        // check the amount of reactions with starboard emojis
        let starboardEmojiCount = 0;
        starboardReactions.forEach(async (starboardReaction) => {
            if (starboardReaction.emoji === reaction.emoji.name) {
                starboardEmojiCount = starboardReaction.count;
            }
        });

        // if the amount of reactions is less than the required amount, return
        if (reaction.count < starboardEmojiCount) return;

        // if the message is already in the starboard channel, return
        const starboardMessages = await starboardChannel.messages.fetch({ limit: 100 });

        if (starboardMessages.find(starboardMessage => starboardMessage.embeds[0].footer.text.startsWith(message.id))) return;
        
        // create the embed
        const embed = {
            color: 0xffac33,
            description: `${message.text}\n\n[Jump to message](${message.url})`,
            footer: {
                text: `⭐️ ${reaction.count} | ${message.id}`
            },
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            },
        }

        // if the message has an image, add it to the embed
        if (message.attachments.size > 0) {
            embed.image = {
                url: message.attachments.first().url
            }
        }

        // send the embed to the starboard channel
        await starboardChannel.send({ embeds: [embed] });
    }
}