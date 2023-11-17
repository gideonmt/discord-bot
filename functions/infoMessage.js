module.exports = () => {
    let indexJsPath = process.cwd() + '/index.js';
    let pathLength = indexJsPath.length;
    if (pathLength > 70) {
        indexJsPath = 'index.js'
        pathLength = 8;
    }
    const spaces = ' '.repeat(70 - pathLength);
    console.log(
`**********************************************************************************
*                                                                                *
*    To learn how to use this bot, head over to: \x1b[94mhttp://localhost:3000/\x1b[0m          *
*                                                                                *
*    GitHub Repository: \x1b[34mhttps://github.com/gideonmt/discord-bot\x1b[0m                  *
*                                                                                *
*    Found a bug or want to request a new feature?                               *
*    Open an issue here: \x1b[34mhttps://github.com/gideonmt/discord-bot/issues\x1b[0m          *
*                                                                                *
*    To disable this message on boot, simply delete the info message section     *
*    from \x1b[34m${indexJsPath}\x1b[0m.${spaces}*
*                                                                                *
**********************************************************************************`
    );
}