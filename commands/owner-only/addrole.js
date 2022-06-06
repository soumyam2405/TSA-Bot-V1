const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class addRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'addrole',
      aliases: ['addrole'],
      memberName: 'addrole',
      group: 'owner-only',
      description: 'Add a role',
      guildOnly: true,
      ownerOnly: true,
      args: [
        {
          key: 'userToAdd',
          prompt: 'Who do you want to add a role to?',
          type: 'string'
        },
        {
          key: 'roleToAdd',
          prompt: 'What Role do you want to add to that user?',
          type: 'string'
        }
      ]
    });
  }

  async run(message, { userToAdd, roleToAdd }) {
    const member  =
      message.mentions.members.first() || message.guild.members.cache.get(userToAdd);
    if (member === undefined)
      return message.channel.send('Please try again with a valid user');
    const role = message.guild.roles.cache.find(r=>r.name===`${roleToAdd}`);
    await member.roles.add(role)
      .catch(e => {
        message.say(
          'Something went wrong when trying to add that role this user, I probably do not have the permission to add that role.'
        );
        return console.error(e);
      });
    const embed = new MessageEmbed()
      .addFields({name: 'Added Role: ', value: role})
      .addFields({name: 'To: ', value: member})
      .setColor("RANDOM");
    message.channel.send(embed);

  }
};
