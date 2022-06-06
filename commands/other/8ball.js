const {Command} = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class eightBall extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            aliases: [],
            group: 'other',
            memberName: '8ball',
            description: 'Just an 8ball command what do you expect?',
            throttling: {
                usages: 2,
                duration: 10
            },
            guildOnly: true,
            args: [
                {
                    key: 'question',
                    prompt: 'Please ask a question',
                    type: 'string',
                }
            ]
        });
    }

    run(message, {question}) {
      question = encodeURIComponent(question);
      fetch(`https://8ball.delegator.com/magic/JSON/${question}`)
        .then(response => response.json())
        .then(json => {
          message.channel.send(json.magic.answer);
        })
    }
};
