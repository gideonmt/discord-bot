module.exports = () => {
    const fs = require('fs');

    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const port = process.env.PORT || 3000;

    app.enable('trust proxy');
    app.set("etag", false);
    app.use(express.static(__dirname));

    app.use(bodyParser.json());

    app.get('/api/settings', (res) => {
        const data = fs.readFileSync('settings.json');
        const settings = JSON.parse(data);
        res.json(settings);
    });

    app.post('/api/settings', (req, res) => {
        const updatedSettings = req.body;
        fs.writeFileSync('settings.json', JSON.stringify(updatedSettings, null, 2));
        res.json({ message: 'Settings updated successfully' });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};