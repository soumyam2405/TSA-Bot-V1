const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = class FactionCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'faction',
            aliases: ['factionstats', 'faction-stats'],
            memberName: 'faction',
            group: 'management',
            description: "Get Faction Stats.",
            guildOnly: true,
            userPermissions: ['KICK_MEMBERS'],
        });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setTitle('Live Faction Stats')
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(message.guild.iconURL({dynamic: true}))
                embed.addFields([
                    {name: 'Tag', value: 'TSA', inline:true},
                    {name: 'Faction Name', value: 'Transport Security\n', inline: true},
                ]);
                fetch('http://server.tycoon.community:30124/status/faction/size.json', {
                    headers: {'X-Tycoon-Key': config.tycoonAPIKey},
                })
                    .then(res => res.json())
                    .then(json => {
                        embed.addField('Total Amount of Members', json[0], true);
                        fetch('http://server.tycoon.community:30124/status/faction/perks.json', {
                            headers: {'X-Tycoon-Key': config.tycoonAPIKey},
                        })
                            .then(res => res.json())
                            .then(json => {
                                embed.addField('Total Amount of Perks', json[0], true);
                                fetch('http://server.tycoon.community:30124/status/faction/balance.json', {
                                    headers: {'X-Tycoon-Key': config.tycoonAPIKey},
                                })
                                    .then(res => res.json())
                                    .then(json => {
                                        embed.addField('Faction Balance', `$${json[0].toLocaleString('en-US')}`, true);
                                        message.channel.send(embed);
                                    })
                                    .catch(err => {
                                        message.say('Request to get the Faction Balance failed :(');
                                        return console.error(err);
                                    });
                            })
                            .catch(err => {
                                message.say('Request to get total amount of Perks failed :(');
                                return console.error(err);
                            });
                    })
                    .catch(err => {
                        message.say('Request to get total amount of members failed :(');
                        return console.error(err);
                    });
    }
};
