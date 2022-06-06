const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const fetch = require("node-fetch");

module.exports = class lifevCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lifev',
            aliases: [],
            memberName: 'lifev',
            group: 'other',
            description: "Gives you a link to connect to the LifeV-Server.",
            guildOnly: true, 
            
        });
    };
    run( message ){
        fetch('http://5.9.0.85:30120/players.json')
            .then(res => res.json())
            .then(json => {
                let players = 0;
                json.forEach(x => {
                    players++;
                })
                let embed = new MessageEmbed()
                    .setTitle(`LifeV Information`)
                    .addFields([
                        {name: `Connect Link`, value: 'https://connect.lifev.net/'},
                        {name: 'Discord Link', value: 'https://discord.lifev.net'},
                        {name: 'Online Players', value: `${players}/32`},
                        ])
                    .setThumbnail(`https://lordhuhn.com/img/LifeV.png`)
                    .setURL('https://lifev.net')
                    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));
                message.channel.send(embed);
            });
        }
};
