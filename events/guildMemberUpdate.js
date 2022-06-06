const {MessageEmbed} = require('discord.js');

module.exports = async (client, oldMember, newMember) => {
    if(oldMember.guild.id!=='574971191014588436') return;
    let auditlog = await oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_ROLE_UPDATE',
    });
    auditlog = auditlog.entries.first();
    let embed = new MessageEmbed()
        .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor('#3f5fd7')
        .setFooter(`Changed by ${auditlog.executor.tag}`);

    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) {
        embed.setTitle('Role added')
            .setDescription(`${addedRoles.map(r => r)} added to ${oldMember}`);
        client.channels.cache.get('665941615403073557').send(embed);
    }

    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) {
        if(newMember.id==='679990320184033294') {
            newMember.roles.add(['752209194316464158']);
        }
        embed.setTitle('Role removed')
            .setDescription(`${removedRoles.map(r => r)} removed from ${oldMember}`);
        client.channels.cache.get('665941615403073557').send(embed);
    }

}
