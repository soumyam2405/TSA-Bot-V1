const {MessageEmbed} = require('discord.js');
/*const Perspective = require('perspective-api-client');
const {perspectiveAPIKey} = require('../config.json');
const perspective = new Perspective({apiKey: perspectiveAPIKey});*/

module.exports = async (client, message) => {
    if(message.guild.id!=='574971191014588436') return;
    let tempmessage = await message.fetch();
    tempmessage = tempmessage.content;

    if(message.guild===null) {
        if(message.author.id==='304325736339210241') return;
        if(message.author.bot) return;
        const dmembed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
            .setDescription(`**Message Text from ${message.author}**\n ${tempmessage}`)
            .setFooter(`ID: ${message.author.id}`)
            .setColor('#3f5fd7')
            .setTimestamp();
        client.channels.cache.get(`719976830291148871`).send(dmembed);
    }

    if(message.author.id === '235148962103951360' && message.content === 'No u') {
        message.delete();
    }
    /*if(message.author.id!=='168534019045195776' && message.author.id!=='304325736339210241' && message.author.id!=='493455159201103882' && !message.author.bot) {
        let messagelength = tempmessage.replace(" ", "");
        const capslength = messagelength.replace(/[^A-Z]/g, "").length;
        messagelength = messagelength.length/2;
        if(messagelength<capslength && tempmessage.length>4) {
            let capsembed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**\n ${tempmessage}`)
                .addFields({name: 'Reason', value: 'too many caps'})
                .setFooter(`ID: ${message.author.id}`)
                .setTimestamp();
            client.channels.cache.get(`576443699073122336`).send(capsembed);
            message.delete();
            const deletetemp = await message.channel.send(`${message.author} Too many caps.`);
            deletetemp.delete({timeout: 10000});
        }
    }*/
        /*const result = await perspective.analyze(tempmessage);
        let json = JSON.stringify(result, null, 2);
        let action = false;
        if(result.attributeScores.TOXICITY.summaryScore.value>0.90) {
            action=true;
            message.delete();
            const toxicscore = result.attributeScores.TOXICITY.summaryScore.value*100;
            message.channel.send(`It seems ${message.author} you message was too toxic so its deleted (${Math.round(toxicscore)}% accurate)`)
        }
        if(result.attributeScores.TOXICITY.summaryScore.value>0.80 && action === false) message.channel.send(`Hey ${message.author} its time to stop being toxic here`)
    */
    //n-word-detector
    if (String(tempmessage).toLowerCase().includes(`nigg`) ||
        String(tempmessage).toLowerCase().includes(`n||igg`) ||
        String(tempmessage).toLowerCase().includes(`nig||g`) ||
        String(tempmessage).toLowerCase().includes(`n||ig||g`)) {
        message.delete();
        if (message.author.bot) return;
        let messageauthor;
        messageauthor = message.guild.member(message.author);
        const role = message.guild.roles.cache.find(r => r.name === `Muted`);
        await messageauthor.roles.add(role);
        message.channel.send(`:white_check_mark: ***\`\`${message.author.tag}\`\` was permanently muted***`);
        messageauthor.send(`You have been muted in \`\`${message.guild.name}\`\` for mentioning the n-word.\nIf you feel this mute was made in error please appeal it in the \`\`mute-appeal\`\` channel.`);
        const nembed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`Permanently Muted ${message.author} for a message in ${message.channel}**\n ${tempmessage}`)
            .addFields({name: 'Reason', value: 'N-Word'})
            .setFooter(`ID: ${message.author.id}`)
            .setColor('#ff0000')
            .setTimestamp();
        client.channels.cache.get(`576443699073122336`).send(nembed);
    }
}
