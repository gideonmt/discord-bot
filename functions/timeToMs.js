function timeToMs(time) {
    const timeUnits = {
        s: 1000,
        sec: 1000,
        secs: 1000,
        second: 1000,
        seconds: 1000,
        m: 60000,
        min: 60000,
        mins: 60000,
        minute: 60000,
        minutes: 60000,
        h: 3600000,
        hr: 3600000,
        hrs: 3600000,
        hour: 3600000,
        hours: 3600000,
        d: 86400000,
        day: 86400000,
        days: 86400000,
        w: 604800000,
        wk: 604800000,
        wks: 604800000,
        week: 604800000,
        weeks: 604800000,
        fortnight: 1209600000,
        "4tnite": 1209600000,
        mo: 2629746000,
        month: 2629746000,
        months: 2629746000,
        year: 31556952000,
        yr: 31556952000,
        yrs: 31556952000,
        years: 31556952000,
    };

    const regex = /(\d+)\s*([a-zA-Z]+)/g;
    let match;
    let timeMs = 0;

    while ((match = regex.exec(time)) !== null) {
        const quantity = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();

        if (timeUnits[unit]) {
            timeMs += quantity * timeUnits[unit];
        }
    }
    
    return timeMs;
}

module.exports = { timeToMs };