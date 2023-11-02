// get stuff from settings
const settings = require('../settings.json');
const activityStatusEnabled = settings.activityStatusEnabled;
const activityStatus = settings.activityStatus;
const { ActivityType } = require('discord.js');

let currentIndex = 0;

module.exports = async (client) => {
    if (!activityStatusEnabled) return;

    console.log(`${currentIndex}: ${activityStatus[currentIndex]}`)

    const activityItem = activityStatus[currentIndex];
    const activityType = activityItem.split(":")[0].toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    const activityMessage = activityItem.split(":")[1];

    console.log(activityType, activityMessage);

    if (activityType === "Custom") {
        client.user.setActivity(activityMessage, { type: ActivityType[activityType], name: activityType });
    } else if (activityType === "Streaming") {
        client.user.setActivity(activityMessage, { type: ActivityType[activityType], url: "https://twitch.tv/username" });
    } else {
        client.user.setActivity(activityMessage, { type: ActivityType[activityStatus] });
    }

    currentIndex = (currentIndex + 1) % activityStatus.length;
}
