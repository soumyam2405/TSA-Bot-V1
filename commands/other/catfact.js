const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'catfact',
            aliases: ['cat-fact', 'cats-fact', 'cats-facts', 'cat-facts'],
            group: 'other',
            memberName: 'catfact',
            description: 'Replies with an interesting cat fact',
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    run(message) {
        fetch(`https://cat-fact.herokuapp.com/facts/random?amount=1`)
            .then(res => res.json())
            .then(json => message.say(json.text))
            .catch(e => {
                message.say('Request to find a kitty failed :(');
                return console.error(e);
            });
    }
};
