const fetch = require('node-fetch');
const {Command} = require('discord.js-commando');

module.exports = class DogBombCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dogbomb',
            aliases: [],
            group: 'other',
            memberName: 'dogbomb',
            description: 'Replies with a lot of dogs',
        });
    }

    run(message) {
        let i = 0;
        while(i<=10) {
            i++;
            fetch(`https://random.dog/woof.json?filter=mp4,webm`)
                .then(res => res.json())
                .then(json => message.channel.send({files: [json.url]}))
                .catch(e => {
                    message.say('Request to find a doggy failed :(');
                    return console.error(e);
                });
        }
    }
};
