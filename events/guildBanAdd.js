const {MessageEmbed} = require('discord.js');

module.exports = async (client, Guild, guildUser) => {
    if(Guild.id!=='574971191014588436') return;
    const embed = new MessageEmbed()
        .setAuthor(guildUser.tag, guildUser.displayAvatarURL({dynamic: true}))
        .setThumbnail(guildUser.displayAvatarURL({dynamic: true, size: 1024}))
        .setTitle('Member Banned')
        .setDescription(`${guildUser}`)
        .setFooter(`ID: ${guildMember.id}`)
        .setColor('#ff0000')
        .setTimestamp();
    client.channels.cache.get('576431882171056206').send(embed);
}