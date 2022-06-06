const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const {owner} = require('../../config.json');

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: [],
            memberName: 'ban',
            group: 'owner-only',
            description: 'Ban a member',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'usertoban',
                    prompt: 'Who do you want to ban? Please specify the ID',
                    type: 'string'
                },
                {
                    key: 'banreason',
                    prompt: 'Why do you want to ban this user?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { usertoban, banreason }) {
        if(owner.includes(usertoban)) return message.reply(`Fuck off that's an owner of this bot`);
        if (!message.guild.member(usertoban)) return message.reply(`That user is not in this guild!`);
        const user = message.guild.members.cache.get(usertoban);
        if(user.bannable===false) {
            return message.reply(`I can't ban that member!`);
        }
        await user.ban({reson: banreason})
            .catch(e => {
                message.say(
                    'Something went wrong when trying to add that role this user, I probably do not have the permission to add that role.'
                );
                return console.error(e);
            });
        const embed = new MessageEmbed()
            .addFields({name: 'Banned Member: ', value: user})
            .addFields({name: 'Reason: ', value: `${message.author.username}: ${banreason}, (${message.author.tag})`})
            .setColor("RANDOM");
        message.channel.send(embed);

    }
};
