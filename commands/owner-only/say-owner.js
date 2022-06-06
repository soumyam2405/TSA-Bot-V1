const { Command } = require('discord.js-commando');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say-owner',
      aliases: [],
      memberName: 'say-owner',
      group: 'owner-only',
      description: 'Not to be used by a normal user.',
      guildOnly: true,
      ownerOnly: true,
      args: [
        {
            key: 'text',
            prompt: 'What do you want the bot to say?',
            type: 'string'
        }
      ]
    });
  }

  run(message, { text }) {
    message.delete();
    return message.say(text);
  }
};
