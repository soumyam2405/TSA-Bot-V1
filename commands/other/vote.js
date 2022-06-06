const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class VoteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'vote',
      aliases: ['poll'],
      memberName: 'vote',
      group: 'other',
      description: "Create a Poll for everyone to vote on",
      args: [
        {
          key: 'vote',
          prompt: 'What do you want to vote for?',
          type: 'string'
        }
      ]
    });
  }
  run(message, {vote}) {
    const embed = new MessageEmbed()
        .setTitle(vote)
        .setColor('BLUE')
        .setFooter(message.author.username,  message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();
    message.channel.send(embed)
        .then(message => {
          message.react('✅');
          message.react('❌')
        })
  }
};
