module.exports = (serverId) => {
    const fs = require('fs');
    const path = require('path');
    const defaultSettingsPath = path.join(__dirname, 'settings.json');

    const serverSettingsPath = path.join(__dirname, `${serverId}.json`);
    if (fs.existsSync(serverSettingsPath)) {
        const serverSettings = JSON.parse(fs.readFileSync(serverSettingsPath));
        return {
            ...serverSettings,
            ...JSON.parse(fs.readFileSync(serverSettingsPath)),
        };
    } else {
        const defaultSettings = JSON.parse(fs.readFileSync(defaultSettingsPath));
        return {
            ...defaultSettings,
            ...JSON.parse(fs.readFileSync(defaultSettingsPath)),
        };
    }
};