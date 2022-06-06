const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SuggestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'suggest',
            aliases: [''],
            memberName: 'suggest',
            group: 'other',
            description: "Create a Suggestion for everyone to vote on",
            /*args: [
                {
                    key: 'suggestion',
                    prompt: 'What do you want to suggest?',
                    type: 'string',
                    default: undefined
                }
            ]*/
        });
    }
    async run(message, {suggestion}) {
        return message.channel.send('We have switched the bot for this command please use ?suggest.');
        if(suggestion===undefined) {
            await message.react("❌");
            let smessage = await message.channel.send(`You need to specify what you want to suggest!`);
            return smessage.delete(10000);
        }
        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`Suggestion`)
            .setColor('BLUE')
            .setDescription(`${suggestion}`)
            .setFooter('TSA', this.client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp();
        message.guild.channels.cache.get(`631223562677649419`).send(embed)
            .then(message => {
                message.react("✅");
                message.react("❌");
            });
        message.react("✅");
    }
};
