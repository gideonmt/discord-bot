function startServer(app, port) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is already in use. Trying the next available port...`);
            port++;
            startServer();
        } else {
            console.error(err);
        }
    });
}

module.exports = (client) => {
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    let port = process.env.PORT || 3000;
    const path = require('path');

    app.enable('trust proxy');
    app.set("etag", false);
    app.use(express.static(__dirname));
    app.use(bodyParser.json());

    startServer(app, port);

    app.get('/api/settings', (req, res) => {
        const data = fs.readFileSync('settings.json');
        const settings = JSON.parse(data);
        res.json(settings);
    });

    app.post('/api/settings', (req, res) => {
        const updatedSettings = req.body;
        fs.writeFileSync('settings.json', JSON.stringify(updatedSettings, null, 2));
        res.json({ message: 'Settings updated successfully' });
    });

    app.use((req, res, next) => {
        req.client = client;
        next();
    });

    // API endpoint to get information about all servers
    app.get('/api/servers', (req, res) => {
        const servers = client.guilds.cache.map(guild => ({
            id: guild.id,
            name: guild.name,
        }));
        res.json({ servers });
    });

    // API endpoint to get information about channels in a specific server
    app.get('/api/:serverId/channels', (req, res) => {
        const serverId = req.params.serverId;
        const server = client.guilds.cache.get(serverId);

        if (server) {
            const channels = server.channels.cache.map(channel => ({
                id: channel.id,
                name: channel.name,
                type: channel.type,
            }));
            res.json({ channels });
        } else {
            res.status(404).json({ error: 'Server not found' });
        }
    });

    // API endpoint to get information about roles in a specific server
    app.get('/api/:serverId/roles', (req, res) => {
        const serverId = req.params.serverId;
        const server = client.guilds.cache.get(serverId);

        if (server) {
            const roles = server.roles.cache.map(role => ({
                id: role.id,
                name: role.name,
                color: role.color,
            }));
            res.json({ roles });
        } else {
            res.status(404).json({ error: 'Server not found' });
        }
    });

    app.get('/settings', (req, res) => {
        const serverId = req.query.serverId;
        const server = client.guilds.cache.get(serverId);
        if (!serverId) {
            res.sendFile(path.join(__dirname, 'serverSelect.html'));
        } else {
            if (server) {
                res.sendFile(path.join(__dirname, 'settings.html'));
            } else {
                res.sendFile(path.join(__dirname, 'serverNotFound.html'));
            }
        }
    });
};
