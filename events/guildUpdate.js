const {MessageEmbed} = require('discord.js');
const moment = require("moment");

module.exports = async (client, oldGuild, newGuild) => {
    if(oldGuild.id!=='574971191014588436') return;
    if(oldGuild.icon!==newGuild.icon) {
        const embed = new MessageEmbed()
            .setTitle('Server updated')
            .setDescription('New Icon')
            .setImage(newGuild.iconURL({dynamic: true}))
            .setColor('#3f5fd7')
            .setTimestamp();
        client.channels.cache.get('576443699073122336').send(embed);
    }
    if(oldGuild.name!==newGuild.name) {
        const embed = new MessageEmbed()
            .setTitle('Server updated')
            .setDescription(`Server name updated from \`\`${oldGuild.name}\`\` to \`\`${newGuild.name}\`\``)
            .setColor('#3f5fd7')
            .setTimestamp();
        client.channels.cache.get('576443699073122336').send(embed);
    }
    if(oldGuild.region!==newGuild.region) {
        const embed = new MessageEmbed()
            .setTitle('Server updated')
            .setDescription(`Region updated from \`\`${oldGuild.region}\`\` to \`\`${newGuild.region}\`\``)
            .setColor('#3f5fd7')
            .setTimestamp();
        client.channels.cache.get('576443699073122336').send(embed);
    }
    if(oldGuild.verificationLevel!==newGuild.verificationLevel) {
        const embed = new MessageEmbed()
            .setTitle('Server updated')
            .setDescription(`Verification Level updated from \`\`${oldGuild.verificationLevel}\`\` to \`\`${newGuild.verificationLevel}\`\``)
            .setColor('#3f5fd7')
            .setTimestamp();
        client.channels.cache.get('576443699073122336').send(embed);
    }
    if(oldGuild.banner!==newGuild.banner) {
        const embed = new MessageEmbed()
            .setTitle('Server updated')
            .setDescription('New Banner')
            .setImage(newGuild.bannerURL({dynamic: true}))
            .setColor('#3f5fd7')
            .setTimestamp();
        client.channels.cache.get('576443699073122336').send(embed);
    }
}
