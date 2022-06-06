const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class Serverinfo extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            aliases: ['serverinfo'],
            group: 'other',
            memberName: 'serverinfo',
            description: 'Replies with some information about the server.',
            throttling: {
                usages: 2,
                duration: 10
            },
        });
    }

    run(message) {
        if (message.channel.type === "dm") return;

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }

        let verifLevels = {
            "NONE": "None",
            "LOW": "Low",
            "MEDIUM": "Medium",
            "HIGH": "(╯°□°）╯︵  ┻━┻",
            "VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
        }
        let region = {
            "brazil": ":flag_br: Brazil",
            "europe": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        };
        const ServerInfoEmbed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addFields({name: "Name", value: message.guild.name, inline: true})
            .addFields({name: "ID", value: message.guild.id, inline: true})
            .addFields({name: "Owner", value: message.guild.owner})
            .addFields({name: "Region", value: region[message.guild.region], inline: true})
            .addFields({name: "Total | Humans | Bots", value: `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: true})
            .addFields({name: "Verification Level", value: verifLevels[message.guild.verificationLevel], inline: true})
            .addFields({name: "Channels", value: message.guild.channels.cache.size, inline: true})
            .addFields({name:"Roles", value: message.guild.roles.cache.size, inline: true})
            .addFields({name: "Creation Date", value: `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, inline: true})
            .setThumbnail(message.guild.iconURL({dynamic: true}));
        message.channel.send(ServerInfoEmbed);
    }
};