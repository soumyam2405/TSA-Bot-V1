const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');

module.exports = class CatBombCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'catbomb',
            aliases: [],
            group: 'other',
            memberName: 'catbomb',
            description: 'Replies with a a lot of cat\'s',
        });
    }

    run(message) {
        let i = 0;
        while(i<=10) {
            i++;
            fetch(`https://aws.random.cat/meow`)
                .then(res => res.json())
                .then(json => message.channel.send(json.file))
                .catch(e => {
                    message.say('Request to find a kitty failed :(');
                    return i=10;
                });
        }
    }
};
