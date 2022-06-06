const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');

module.exports = class CatCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cat',
      aliases: ['cat-pic', 'cats'],
      group: 'other',
      memberName: 'cat',
      description: 'Replies with a cute cat picture',
    });
  }

  run(message) {
    fetch(`https://aws.random.cat/meow`)
      .then(res => res.json())
      .then(json => message.channel.send(json.file))
      .catch(e => {
        message.say('Request to find a kitty failed :(');
        return console.error(err);
      });
  }
};
