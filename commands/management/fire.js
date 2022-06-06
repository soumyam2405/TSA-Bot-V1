const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');

module.exports = class FireCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fire',
            aliases: [],
            memberName: 'fire',
            group: 'management',
            description: "Fires a Member.",
            guildOnly: true,
            userPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    key: 'ID',
                    prompt: 'What is the Discord ID of the member you want to fire?',
                    type: 'string',
                }
            ]
        });
    }

    async run(message, {ID}) {
        if (!message.guild.members.cache.get(ID)) return message.channel.send('That person isn\'t in the discord!');
        const member = await message.guild.members.cache.get(ID);
        if (!member.roles.cache.get('576451588797890581')) return message.reply(`${member} isn't appart of TSA.`)
        let embed = new MessageEmbed()
            .setTitle(`Member Fired`)
            .setColor(`#FF470F`)
            .setTimestamp()
            .setDescription(`${message.author} Fired ${member}`)
            .setFooter(`ID: ${member.id}`);
        await member.roles.remove(['576435452035203082', '576451588797890581'], 'Member Fired, Roles Removed');
        await member.roles.add(['626758829178093588'], 'Member Fired, Roles Added');
        await this.client.channels.cache.get(`691082753206124594`).send(embed);
        await this.client.channels.cache.get('576437794470100993').send(`Fired ${member}`, {files: ['./resources/files/You\ are\ Fired.gif']});
        message.react('727991491796009071');
        message.channel.send(`Fired ${member}`)
    }
};
