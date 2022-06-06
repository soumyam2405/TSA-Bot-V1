const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = class HireCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hire',
            aliases: [],
            memberName: 'hire',
            group: 'management',
            description: "Hires a Member.",
            guildOnly: true,
            userPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    key: 'ID',
                    prompt: 'Please enter the Discord ID of the member you want to hire.',
                    type: 'string',
                }
            ]
        });
    }

    async run(message, {ID}) {
        if (!message.guild.members.cache.get(ID)) {
            message.react(':no_entry:')
            return message.channel.send("That person isn't in the discord!");
        }
        message.react('714808438768795699');
        const member = await message.guild.members.cache.get(ID);
        let embed = new MessageEmbed()
            .setTitle(`Member Hired`)
            .setColor(`#23D160`)
            .setTimestamp()
            .setDescription(`${message.author} Hired ${member}`)
            .setFooter(`ID: ${member.id}`);
        await member.roles.remove(['740237075613483088', '626758829178093588'], 'Member Rehired, Roles Removed');
        await member.roles.add(['576435452035203082', '576451588797890581'], 'Member Rehired, Roles Added');
        await this.client.channels.cache.get(`691082753206124594`).send(embed);
        await this.client.channels.cache.get(`576437794470100993`).send(`Welcome to ${message.guild.name} ${member}, check out <#752106908697100349> and <#578238934266413096>! If there are questions simply DM <@680923376805609531>.`, {files: ['./resources/files/Hello_Mr_Bean.gif']});
        await message.react('727991491796009071');
        message.reactions.cache.get('714808438768795699').remove();
        await message.channel.send(`Hired ${member}`);
    }
};
