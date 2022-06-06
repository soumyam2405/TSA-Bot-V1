const { Command } = require('discord.js-commando');

module.exports = class WelcomeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'welcome',
            aliases: [],
            memberName: 'welcome',
            group: 'management',
            description: 'Welcome someone',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: '',
                    type: 'string',
                    default: 'none'
                }
            ]
        });
    }

    async run(message, { user }) {
        message.delete();
        if(user==="none") {
            return message.channel.send(`Please give a valid user ID or a mention a valid user.`);
        }
        const numbers = /^[0-9]+$/;
        if(message.mentions.users.first()) { // If user got pinged
            user = message.mentions.users.first();
        }
        else if(user.match(numbers)){ // find user by his ID
            user = message.guild.members.cache.get(user).user;
            // user = temp.user;
        }
        else { // find user by name
            let temp = message.guild.members.cache.find(user => user.username === user.username);
            user = temp.user;
        }
        if (user === undefined)
            return message.channel.send('Please try again with a valid user');


        message.channel.send(`Welcome to ${message.guild.name} ${user}, check out <#665925561826279444> and <#578238934266413096>! If there are questions simply DM <@680923376805609531>.`, {files: ["./resources/files/Whale_Hello_There.gif"]});
    }
};
