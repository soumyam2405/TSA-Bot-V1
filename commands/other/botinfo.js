const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
const functions = require('../../functions.js');
const {prefix} = require('../../config.json');

module.exports = class Botinfo extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            aliases: ['botinfo'],
            group: 'other',
            memberName: 'botinfo',
            description: 'Replies with some information about the bot.',
            throttling: {
                usages: 2,
                duration: 10
            },
        });
    }

    run(message) {
        let uptime = this.client.uptime;
        uptime = functions.GetBotinfoUptime(uptime);
        let botembed = new MessageEmbed()
            .setTitle(this.client.user.tag)
            .setColor("0ED4DA")
            .setThumbnail(this.client.user.displayAvatarURL())
            .addFields([
                {name: `Prefix:`, value: `\`${prefix}\` or ${this.client.user}`, inline: true},
                {name: `Latency`, value: `${this.client.ws.ping} ms`, inline: true},
                {name: `Uptime`, value: uptime, inline: true},
                {name: "Created", value: `${moment.utc(this.client.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} \n${moment(new Date()).diff(this.client.user.createdAt, 'days')} days ago`, inline: true},
                {name: "Servers", value: `${this.client.guilds.cache.size} Server`, inline: true}
            ])
            .setFooter("Bot ID: " + this.client.user.id);
        return message.channel.send(botembed)
    }
};