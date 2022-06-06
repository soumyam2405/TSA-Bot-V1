const fetch = require('node-fetch');
const {Command} = require('discord.js-commando');

module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            aliases: ['dog-pic', 'dogs'],
            group: 'other',
            memberName: 'dog',
            description: 'Replies with a cute dog',
        });
    }

    run(message) {
        fetch(`https://random.dog/woof.json?filter=mp4,webm`)
            .then(res => res.json())
            .then(json => message.channel.send({files: [json.url]}))
            .catch(e => {
                message.say('Request to find a doggy failed :(');
                return console.error(e);
            });
    }
};
