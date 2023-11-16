// get stuff from settings
const settings = require('../settings.json');
const activityStatusEnabled = settings.activityStatusEnabled;
const activityStatus = settings.activityStatus;
const { ActivityType } = require('discord.js');

let currentIndex = 0;

function replace(activityMessage, client) {
    const replacements = {
        '{client.username}': `${client.user.username}`,
        '{client.id}': `${client.user.id}`,
        '{client.tag}': `${client.user.tag}`,
    }

    for (const placeholder in replacements) {
        activityMessage = activityMessage.replace(placeholder, replacements[placeholder]);
    }
}

module.exports = async (client) => {
    if (!activityStatusEnabled) return;

    const activityItem = activityStatus[currentIndex];
    const activityType = activityItem.split(":")[0].toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    let activityMessage = activityItem.split(":")[1];
    replace(activityMessage, client);

    if (activityType === "Custom") {
        client.user.setActivity(activityMessage, { type: ActivityType[activityType], name: activityType });
    } else if (activityType === "Streaming") {
        client.user.setActivity(activityMessage, { type: ActivityType[activityType], url: "https://twitch.tv/username" });
    } else {
        client.user.setActivity(activityMessage, { type: ActivityType[activityStatus] });
    }

    currentIndex = (currentIndex + 1) % activityStatus.length;
}
