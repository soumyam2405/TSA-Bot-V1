const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class addRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'removerole',
      aliases: ['remrole'],
      memberName: 'removerole',
      group: 'owner-only',
      description: 'Remove a role',
      guildOnly: true,
      ownerOnly: true,
      args: [
        {
          key: 'userToRem',
          prompt: 'Who do you want to remove a role from?',
          type: 'string'
        },
        {
          key: 'roleToRemove',
          prompt: 'What Role do you want to remove from that user?',
          type: 'string'
        }
      ]
    });
  }

  async run(message, { userToRem, roleToRemove }) {
    let user = functions.getMember(message, userToRem);
    const role = message.guild.roles.cache.find(r=>r.name==`${roleToRemove}`);
    await user.roles.remove(role)
      .catch(e => {
        message.say(
          'Something went wrong when trying to add that role this user, I probably do not have the permission to remove that role.'
        );
        return console.error(e);
      });
    const embed = new MessageEmbed()
      .addFields({name: 'Removed Role: ', value: role})
      .addFields({name: 'From: ', value: user})
      .setColor("RANDOM");
    message.channel.send(embed);

  }
};
