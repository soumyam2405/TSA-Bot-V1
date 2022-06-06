const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');

module.exports = class TTConnectCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'connect',
            aliases: ['tt-connect'],
            memberName: 'connect',
            group: 'tt',
            description: "Gives you a link to connect to the TT-Servers.",
            guildOnly: true,
            args: [
                {
                    key: 'servernumber',
                    prompt: 'What Server do you want to connect to? Please only write a number.',
                    type: 'string',
                    validate: servernumber => servernumber.length > 0 && servernumber.length < 2
                }
            ]
        });
    }

    run(message, {servernumber}) {
        if(servernumber==0) {
            return message.channel.send({files: ["./resources/files/uwotm8.gif"]});
        }
        servernumber = servernumber.toUpperCase();
        let connectCMD = {
            '1': 'connect server.tycoon.community:30120',
            '2': 'connect server.tycoon.community:30122',
            '3': 'connect server.tycoon.community:30123',
            '4': 'connect server.tycoon.community:30124',
            '5': 'connect server.tycoon.community:30125',
            'E': 'connect na.tycoon.community:30126',
            '6': 'connect na.tycoon.community:30120',
            '7': 'connect na.tycoon.community:30122',
            '8': 'connect na.tycoon.community:30123',
            '9': 'connect na.tycoon.community:30124',
            'A': 'connect na.tycoon.community:30125'
        };
        let connectURL = `https://lordhuhn.com/connect/S${servernumber}`;
        let embed = new MessageEmbed()
            .setTitle(`Connect to Server ${servernumber}.`)
            .addFields({name: `Connect URL`, value: connectURL})
            .addFields({name: `Connect Command (F8)`, value: connectCMD[servernumber]})
            .setThumbnail(`https://i.imgur.com/5GU986U.gif`)
            .setColor('#3f5fd7')
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));

        message.channel.send(embed);
    }
};
