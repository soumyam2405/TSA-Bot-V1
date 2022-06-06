const {Command} = require('discord.js-commando');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = class MembersCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'charges',
            aliases: [],
            memberName: 'charges',
            group: 'management',
            description: "Get TT API Charges.",
            guildOnly: true,
            userPermissions: ['KICK_MEMBERS'],
        });
    }

    async run(message) {
        fetch('http://server.tycoon.community:30124/status/charges.json', {
            headers: {'X-Tycoon-Key': config.tycoonAPIKey},
        })
            .then(res => res.json())
            .then(json => {
                message.channel.send(`There are ${json[0]} charges left.`)
            })
            .catch(err => {
                message.say('Request to get total amount of members failed :(');
                return console.error(err);
            });
    }
};
