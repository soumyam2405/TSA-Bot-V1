const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'changelog',
            aliases: [],
            memberName: 'changelog',
            group: 'management',
            description: 'Post\'s a changelog message (>Manager Only)',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'Ping',
                    prompt: 'To ping here enter `here`, to ping everyone enter `everyone`, to ping Faction Member enter `faction member` and for no ping type anything else.',
                    type: 'string'
                },
                {
                    key: 'Title',
                    prompt: 'What do you want to use as the title?',
                    type: 'string'
                },
                {
                    key: 'Message',
                    prompt: 'What do you want to write in the main message?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, {Ping, Title, Message}) {
        const embed = new MessageEmbed()
            .setTitle(`**__Changelog__** :loudspeaker:`)
            .addFields({name: Title, value: Message})
            .setColor('BLUE')
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();

        if (Ping.toLowerCase() === 'everyone') {
            this.client.channels.cache.get('600814597485625390').send("@everyone", embed).then(msg => msg.crosspost());
            message.react("727991491796009071");
        } else if (Ping.toLowerCase() === 'here') {
            this.client.channels.cache.get('600814597485625390').send("@here", embed).then(msg => msg.crosspost());
            message.react("727991491796009071");
        } else if(Ping.toLowerCase() === 'faction member') {
            this.client.channels.cache.get('600814597485625390').send("<@&576451588797890581>", embed).then(msg => msg.crosspost());
            message.react("727991491796009071");
        } else {
            this.client.channels.cache.get('600814597485625390').send(embed).then(msg => msg.crosspost());
            message.react("727991491796009071");
        }
    }
};
