const {MessageEmbed} = require('discord.js');
const moment = require("moment");

module.exports = async (client, guildMember) => {
    if(guildMember.guild.id!=='574971191014588436') return;
    const embed = new MessageEmbed()
        .setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(guildMember.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTitle('Member left')
        .setDescription(`${guildMember} joined ${moment(new Date()).diff(guildMember.joinedAt, 'days')} days ago`)
        .setFooter(`ID: ${guildMember.id}`)
        .setColor('#ff0000')
        .setTimestamp();
    client.channels.cache.get('691001526310666330').send(embed);

    let auditlogb = await guildMember.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    auditlogb = auditlogb.entries.first();
    auditlogk = await guildMember.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK',
    });
    const timek = auditlogk.createdTimestamp + 10;
    const timeb = auditlogb.createdTimestamp + 10;
    auditlogk = auditlogk.entries.first();
    if ((auditlogb.target.id === guildMember.id && auditlogk.target.id === guildMember.id) && new Date() <= timek || new Date() <= timeb) {
        if (auditlogb.createdTimestamp > auditlogk.createdTimestamp) {
            return client.channels.cache.get('585234368939819066').send(`${guildMember.user.tag} has been banned from ${guildMember.guild.name} for ${auditlogb.reason}`);
        }
        if (auditlogb.createdTimestamp < auditlogk.createdTimestamp) {
            return client.channels.cache.get('585234368939819066').send(`${guildMember.user.tag} has been kicked from ${guildMember.guild.name} for ${auditlogk.reason}`);
        }
    }
    if (auditlogb.target.id === guildMember.id) {
        return client.channels.cache.get('585234368939819066').send(`${guildMember.user.tag} has been banned from ${guildMember.guild.name} for ${auditlogb.reason}`);
    }
    if (auditlogk.target.id === guildMember.id) {
        return client.channels.cache.get('585234368939819066').send(`${guildMember.user.tag} has been kicked from ${guildMember.guild.name} for ${auditlogk.reason}`);
    }
    client.channels.cache.get(`585234368939819066`).send(`${guildMember.user.tag} has left ${guildMember.guild.name}`);


}
