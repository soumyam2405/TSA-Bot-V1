const {MessageEmbed} = require('discord.js');

module.exports = async (client, role) => {
    if(role.guild.id!=='574971191014588436') return;
    const embed = new MessageEmbed()
        .setTitle('New Role Created')
        .setDescription(`**Name:** ${role.name}\n **Color:** ${role.hexColor}\n **Mentionable:** ${role.mentionable}\n **Displayed separately:** ${role.hoist}\n **Position:** ${role.position}`)
        .setFooter(`Role ID: ${role.id}`)
        .setColor('#90ee90')
        .setTimestamp();
    client.channels.cache.get('576443699073122336').send(embed);
}