const {Command} = require('discord.js-commando');
const { exec } = require("child_process")

module.exports = class DebugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'debug',
            aliases: [],
            group: 'owner-only',
            memberName: 'debug',
            guildOnly: true,
            ownerOnly: true,
            description: 'Debug'
        });
    }

    run(message) {
        exec('pm2 logs .', (stderr, stdout) =>{
            if(stderr===null) message.channel.send("Logs: ```" + stdout + "```");
            else message.channel.send("Logs Failed: ```" + stderr + "```");
        })
    }
};
