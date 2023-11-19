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

module.exports = () => {
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    let port = process.env.PORT || 3000;

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
};
