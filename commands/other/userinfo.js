const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const moment = require("moment");
const functions = require("../../functions.js");

module.exports = class Userinfo extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            aliases: ['whois', 'user', 'ui'],
            group: 'other',
            memberName: 'userinfo',
            description: 'Replies with a users info',
            throttling: {
                usages: 2,
                duration: 10
            },
            args: [
                {
                    key: 'userinfo',
                    prompt: 'For what user do you want info for?',
                    type: 'string',
                    default: 'default'
                }
            ]
        });
    }

    async run(message, {userinfo}) {
        let user = functions.getMember(message, userinfo);
            let embedcolor = user.presence.status;
            if (embedcolor === 'online') embedcolor = '#43B581';
            else if (embedcolor === 'idle') embedcolor = '#FAA61A';
            else if (embedcolor === 'offline') embedcolor = '#747F8D';
            else if (embedcolor === 'dnd') embedcolor = '#F04747';
            const member = message.guild.members.cache.get(user.id);
            const UserinfoEmbed = new MessageEmbed()
                .setColor(embedcolor)
                .setThumbnail(user.displayAvatarURL({dynamic: true, size: 1024}))
                .setTitle(`${user.username}#${user.discriminator}`)
                .addFields([
                    {
                        name: "Nickname",
                        value: `${member.nickname !== null ? `${member.nickname}` : 'None'}`,
                        inline: true
                    },
                ])
                .addFields({
                    name: "Created At",
                    value: `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} \n${moment(new Date()).diff(user.createdAt, 'days')} days ago`,
                    inline: true
                })
                .addFields({
                    name: "Joined At",
                    value: `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} \n${moment(new Date()).diff(member.joinedAt, 'days')} days ago`,
                    inline: true
                })
                .addFields({name: "Status", value: `${user.presence.status}`, inline: true})
                .addFields({name: "Roles", value: member.roles.cache.map(roles => `${roles}`).join(', '), inline: true})
                .setFooter(`ID: ` + user.id, user.displayAvatarURL({dynamic: true}))
                .setColor('#3f5fd7')
                .setTimestamp();
            message.channel.send(UserinfoEmbed);
    }
};
