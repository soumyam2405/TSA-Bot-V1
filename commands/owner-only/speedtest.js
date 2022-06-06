const {Command} = require('discord.js-commando');
const {exec} = require("child_process")

module.exports = class SpeedtestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'speedtest',
            aliases: [],
            group: 'owner-only',
            memberName: 'speedtest',
            guildOnly: true,
            ownerOnly: true,
            description: 'Makes a Speedtest'
        });
    }

    run(message) {
        exec('speedtest --server-id=10010', (stderr, stdout) => {
            if (stderr === null) message.channel.send("```" + stdout + "```");
            else message.channel.send("```" + stderr + "```");
        })
    }
};