const settings = require('../settings.json');
// const starboardEnabled = settings.starboardEnabled;
// const starboardChannelId = settings.starboardChannel;
// const starboardEmojisInput = settings.starboardEmojis;
// const starboardReactions = settings.starboardReactions;
const { starboardEnabled, starboardChannel: starboardChannelId, starboardEmojis: starboardEmojisInput, starboardReactions } = settings

module.exports = {
    handleStarboard: async (reaction, client) => {
        if (!starboardEnabled || !starboardChannelId || !starboardEmojisInput || !starboardReactions) return;

        const message = await reaction.message.fetch();
        const reactionFetch = await reaction.fetch()
        const starboardChannel = client.channels.cache.get(starboardChannelId);

        const starboardEmojis = starboardEmojisInput.split(', ').map(emoji => emoji.normalize("NFC"));
        const reactionEmoji = String(reaction.emoji).normalize("NFC");

        if (!starboardChannel || message.author.bot || !starboardEmojis.some(emoji => emoji === reactionEmoji || emoji === `${reaction.emoji}\uFE0F` || emoji === `${reaction.emoji}\uFE0E`)) return;

        const messages = await starboardChannel.messages.fetch({ limit: 100 });
        const correctMessage = messages.find((msg) => {
            return msg.embeds.some((embed) => {
                return embed.footer && embed.footer.text.includes(message.id);
            });
        });
        
        if (reactionFetch.count === starboardReactions && !correctMessage) {
            const embed = {
                color: 0xffac33,
                description: `${message.content}\n\n[Jump to message](${message.url})`,
                footer: {
                    text: `⭐️ ${reactionFetch.count} | ${message.id}`
                },
                author: {
                    name: message.author.globalName,
                    icon_url: message.author.displayAvatarURL()
                },
            }

            if (message.attachments.size > 0) {
                embed.image = {
                    url: message.attachments.first().url
                }
            }

            await starboardChannel.send({ embeds: [embed] });
        } else if (reactionFetch.count > starboardReactions && correctMessage) {
            const embed = {
                color: 0xffac33,
                description: `${message.content}\n\n[Jump to message](${message.url})`,
                footer: {
                    text: `⭐️ ${reactionFetch.count} | ${message.id}`
                },
                author: {
                    name: message.author.globalName,
                    icon_url: message.author.displayAvatarURL()
                },
            }

            if (message.attachments.size > 0) {
                embed.image = {
                    url: message.attachments.first().url
                }
            }

            await correctMessage.edit({
                embeds: [embed],
            });
        } else {
            return;
        }
    }
}