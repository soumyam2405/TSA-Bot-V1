const fetch = require('node-fetch');
const { tenorAPI } = require('../../config.json');
const { Command } = require('discord.js-commando');

module.exports = class HuhnCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'huhn',
      aliases: ['huhn-pic', 'hühner'],
      group: 'other',
      memberName: 'huhn',
      description: 'Replies with a cute huhn picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }

  run(message) {
    fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=chicken&limit=1`)
      .then(res => res.json())
      .then(json => message.say(json.results[0].url))
      .catch(e => {
        message.say('Request to find a huhn failed :(');
        return console.error(e);
      });
  }
};
