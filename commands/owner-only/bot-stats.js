const {Command} = require('discord.js-commando');
const os = require('os');
const cpuStat = require("cpu-stat");
const functions = require('../../functions.js');
const { version } = require("discord.js");
const {MessageEmbed} = require("discord.js");

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bot-stats',
            aliases: [],
            group: 'owner-only',
            memberName: 'bot-stats',
            guildOnly: true,
            ownerOnly: true,
            //clientPermissions: ['ADMINISTRATOR'],
            description: 'Gives out stats of the bot'
        });
    }

    run(message) {
        let uptime = this.client.uptime;
        uptime = functions.GetBotinfoUptime(uptime);
        const thisclient = this.client;
        cpuStat.usagePercent(function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            let embedStats = new MessageEmbed()
                .setTitle("*** Stats ***")
                .setColor("#00ff00")
                .addFields([
                    {
                        name: "• Mem Usage",
                        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
                        inline: true
                    },
                    {name: "• Uptime ", value: `${uptime}`, inline: true},
                    {name: "• Users", value: `${thisclient.users.cache.size.toLocaleString()}`, inline: true},
                    {name: "• Servers", value: `${thisclient.guilds.cache.size.toLocaleString()}`, inline: true},
                    {name: "• Channels ", value: `${thisclient.channels.cache.size.toLocaleString()}`, inline: true},
                    {name: "• Discord.js", value: `v${version}`, inline: true},
                    {name: "• CPU", value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``},
                    {name: "• CPU usage", value: `\`${percent.toFixed(2)}%\``, inline: true},
                    {name: "• Arch", value: `\`${os.arch()}\``, inline: true},
                    {name: "• Platform", value: `\`\`${os.platform()}\`\``, inline: true},
                    {name: "• Node", value: `${process.version}`, inline: true}
                ])
                .setFooter("Bot ID: " + thisclient.user.id)


            message.channel.send(embedStats)
        })
    }
};
