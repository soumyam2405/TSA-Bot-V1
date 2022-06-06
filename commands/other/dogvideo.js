const fetch = require('node-fetch');
const {Command} = require('discord.js-commando');

module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dogvideo',
            aliases: ['dog-video'],
            group: 'other',
            memberName: 'dogvideo',
            description: 'Replies with a cute dog Video',
        });
    }

    run(message) {
        fetch(`https://random.dog/woof.json?include=mp4,webm`)
            .then(res => res.json())
            .then(json => message.channel.send({files: [json.url]}))
            .catch(e => {
                message.say('Request to find a doggy failed :(');
                return console.error(e);
            });
    }
};
