const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');

module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dogfact',
            aliases: ['dog-fact', 'dogs-fact', 'dogs-facts', 'dog-facts'],
            group: 'other',
            memberName: 'dogfact',
            description: 'Replies with an interesting dog fact',
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    run(message) {
        fetch(`https://some-random-api.ml/facts/dog`)
            .then(res => res.json())
            .then(json => message.say(json.fact))
            .catch(e => {
                message.say('Request to find a kitty failed :(');
                return console.error(e);
            });
    }
};
