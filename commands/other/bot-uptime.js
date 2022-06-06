const {Command} = require('discord.js-commando');
const functions = require("../../functions.js");

module.exports = class BotUptimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bot-uptime',
            aliases: ['bot-alive', 'bot-up'],
            memberName: 'bot-uptime',
            group: 'other',
            description: "Replies with the bot's total uptime."
        });
    }

    run(message) {
        let uptime = this.client.uptime;
        uptime = functions.GetClientUptime(uptime);

        return message.channel.send(
            `:chart_with_upwards_trend: I've been running for ${uptime}!`
        );
    }


};
