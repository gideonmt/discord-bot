async function listData() {
    const { Reminders, ModmailBans } = require('../../functions/db/dbObjects');

    console.log('Reminders:');

    const reminders = await Reminders.findAll();

    if (!reminders[0]) {
        console.log('No reminders found.');
    } else {
        for (const reminder of reminders) {
            console.log(reminder);
            console.log('\n.');
        }
    }

    console.log('\nModmail Bans:');

    const modmailBans = await ModmailBans.findAll();

    if (!modmailBans[0]) { 
        console.log('No modmail bans found.')
    } else {
        for (const modmailBan of modmailBans) {
            console.log(modmailBan);
            console.log('\n.');
        }
    }

    return console.log('\nDone.')
}

listData();