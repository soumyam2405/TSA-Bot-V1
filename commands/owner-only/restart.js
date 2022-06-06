const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'restart',
      aliases: [],
      memberName: 'restart',
      group: 'owner-only',
      description: 'Not to be used by a normal user.',
      ownerOnly: true,
    });
  }

  async run(message, { restartreason }) {
    let useravatar = message.author.avatar;
    if(useravatar!=null) {
      if (useravatar.startsWith(`a_`)) {
        useravatar = message.author.displayAvatarURL({format: "gif", dynamic: true});
      } else {
        useravatar = message.author.displayAvatarURL({format: "png", dynamic: false});
      }
    }
    const embed = new MessageEmbed()
        .setTitle(`Restart`)
        .setColor('BLUE')
        .setFooter(message.author.username,  useravatar)
        .setTimestamp();
    await this.client.channels.cache.get(`677893834734305281`).send(embed);
    await message.channel.send(`<a:loading:671794524619800576>Restarting...<a:loading:671794524619800576>`);
    process.exit();
  }
};
