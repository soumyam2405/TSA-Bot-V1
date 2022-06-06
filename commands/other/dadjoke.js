const fetch = require('node-fetch');
const {Command} = require('discord.js-commando');

module.exports = class DadjokeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dadjoke',
            aliases: ['dad-joke'],
            group: 'other',
            memberName: 'dadjoke',
            description: 'Replies with a dadjoke',
        });
    }

    run(message) {
        fetch(`https://icanhazdadjoke.com/`, {method: 'GET', headers: {Accept: "application/json"}})
            .then(res => res.json())
            .then(json => message.channel.send(json.joke)) //message.channel.send({files: [json.file]}))
            .catch(e => {
                message.say('Request to fetch a dadjoke failed :(');
                return console.error(e);
            });
    }
};
