const {Command} = require('discord.js-commando');
const { exec } = require("child_process")

module.exports = class GitPullCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'git-pull',
            aliases: [],
            group: 'owner-only',
            memberName: 'git-pull',
            guildOnly: true,
            ownerOnly: true,
            description: 'Pull new Updates from Github'
        });
    }

    run(message) {
        exec('git pull', (stderr, stdout) =>{
            if(stderr===null) message.channel.send("update: ```" + stdout + "```");
            else message.channel.send("update failed: ```" + stderr + "```");
        })
    }
};
