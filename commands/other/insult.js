const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const functions = require("../../functions.js");

module.exports = class InsultCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'insult',
      aliases: ['roast'],
      group: 'other',
      memberName: 'insult',
      description: 'Generate an evil insult!',
      throttling: {
        usages: 1,
        duration: 6
      },
      args: [
        {
          key: 'insult_user',
          prompt: 'Who do you want to insult?',
          type: 'string',
          default: "none"
        }
      ]
    });
  }

  run(message, {insult_user}) {
    insult_user = functions.getMember(message, insult_user);
    if(insult_user === this.client.user) {
      insult_user = message.author;
      message.channel.send(`Uh?!! Nice try! I am not going to roast myself. Instead I am going to roast you now.`)
    }
    fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
        .then(res => res.json())
        .then(json => {
          return message.say(`Hey, ${insult_user}! ${json.insult}`);
        })
        .catch(err => {
          message.say('Failed to deliver insult :sob:');
          return console.error(err);
        });
  }
};
