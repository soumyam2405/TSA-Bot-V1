const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'embed',
      aliases: ['embed-message'],
      memberName: 'embed',
      group: 'guild',
      description: 'Embed\'s a message',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      args: [
        {
          key: 'Title',
          prompt: 'What do you want to use as the title?',
          type: 'string'
        },
        {
          key: 'Message',
          prompt: 'What do you want to write in the main message?',
          type: 'string'
        },
        {
          key: 'Channel',
          prompt: 'Send the ID of the channel you want to send the embet to.',
          type: 'string'
        }
      ]
    });
  }

  run(message, { Title, Message, Channel }) {
    const embed = new MessageEmbed()
        .addFields({name: Title, value: Message})
        .setColor('BLUE')
        .setFooter(message.author.username,  message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();
    this.client.channels.cache.get(Channel).send(embed);

  }
};
