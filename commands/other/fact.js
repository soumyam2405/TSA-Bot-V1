const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');

module.exports = class FactCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fact',
            aliases: ['facts'],
            group: 'other',
            memberName: 'fact',
            description: 'Replies with a fact',
        });
    }

    run(message) {
        fetch(`https://useless-facts.sameerkumar.website/api`)
            .then(res => res.json())
            .then(json => message.channel.send(json.data))
            .catch(e => {
                message.say('Request to get a fact failed :(');
                return console.error(e);
            });
    }
};