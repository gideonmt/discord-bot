async function listData() {
    const { Reminders, ModmailBans, Polls, Warns } = require('../../functions/db/dbObjects');

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

    console.log('\nPolls:');

    const polls = await Polls.findAll();
    
    if (!polls[0]) {
        console.log('No polls found.');
    } else {
        for (const poll of polls) {
            console.log(poll);
            console.log('\n.');
            console.log(poll.options)
            console.log('\n')
        }
    }

    console.log('\nWarns:');

    const warns = await Warns.findAll();

    if (!warns[0]) {
        console.log('No warns found.');
    } else {
        for (const warn of warns) {
            console.log(warn);
            console.log('\n.');
        }
    }

    return console.log('\nDone.')
}

listData();