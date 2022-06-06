const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const {getMember} = require("../../functions");

module.exports = class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['av'],
            group: 'other',
            memberName: 'avatar',
            description: 'Replies with a users Avatar.',
            throttling: {
                usages: 2,
                duration: 10
            },
            guildOnly: true,
            args: [
                {
                    key: 'avatar',
                    prompt: 'For what user do you want info for?',
                    type: 'string',
                    default: 'default'
                }
            ]
        });
    }

    run(message, {avatar}) {
        let user = getMember(message, avatar);
        if (user === undefined)
            return message.channel.send('Please try again with a valid user');
        let icon_embed = new MessageEmbed()
            .setTitle(`${user.tag}s profile picture!`)
            .setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
            .setColor('#3f5fd7')
        return message.say(icon_embed);
    }
};
