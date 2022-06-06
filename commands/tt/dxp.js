const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class TTDxpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dxp',
            aliases: ['2xp'],
            memberName: 'dxp',
            group: 'tt',
            description: "Informs other members about a currently running dxp event. Do **NOT** abuse!",
            guildOnly: true,
        });
    }

    async run(message) {
        message.reply("We have automated the Double EXP Notification. Doing it manually is no longer required.");
    }
};
