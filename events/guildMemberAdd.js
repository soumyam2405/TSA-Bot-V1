const {MessageEmbed} = require('discord.js');
const moment = require("moment");

module.exports = async (client, guildMember) => {
    if(guildMember.guild.id!=='574971191014588436') return;
    client.channels.cache.get('585234368939819066').send(`Welcome ${guildMember} to ${guildMember.guild}! Check out <#752106908697100349> and <#656210294871293954>!`)

    const embed = new MessageEmbed()
        .setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(guildMember.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTitle('Member joined')
        .setDescription(`${guildMember} ${guildMember.guild.memberCount} to join \n created ${moment(new Date()).diff(guildMember.user.createdAt, 'days')} days ago`)
        .setFooter(`ID: ${guildMember.id}`)
        .setColor('#90ee90')
        .setTimestamp();
   client.channels.cache.get('691001526310666330').send(embed);
}
