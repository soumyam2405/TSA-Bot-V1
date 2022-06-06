const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const functions = require("../../functions.js");
const fetch = require("node-fetch");

module.exports = class TTNameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'names',
            aliases: ['tt-names', 'players-online'],
            memberName: 'names',
            group: 'tt',
            description: "Replies with a name list of a TT Server.",
            guildOnly: true,
            args: [
                {
                    key: 'servernumber',
                    prompt: 'Please provide a Server number',
                    type: 'string',
                    validate: servernumber => servernumber.length > 0 && servernumber.length < 2
                }
            ]
        });
    }

    async run(message, {servernumber}) {
        const Response = functions.GetServerIPandPort(servernumber); //get server ip and port
        const ServerIP = Response[0];
        const ServerPort = Response[1];


        let SentMessage = false;

        let playerNames = [];
        let playerID = [];
        let playerJobs = [];


        setTimeout(() => { //wait 5000 ms
            if (!SentMessage) { //if not sent message after 5 seconds
                return message.channel.send("Server isn't online.")
            }
        }, 5000);

        fetch(`http://${ServerIP}:3012${ServerPort}/status/widget/players.json`)
            .then(res => res.json())
            .then(json => { //get server players
                SentMessage = true; //sent message
                json.players.forEach(player => { //go through all players
                    //if (CompanyMembers.includes(player[2].toString())) { //if the player is in company
                    playerNames.push(player[0]); //add player name
                    playerID.push(player[2].toString()); //add player ID
                    playerJobs.push(player[5]) //add player job
                    //}
                });

                if (playerNames.length < 1) return message.channel.send("No players on that server."); //if less than 1 player then no players
                let nameEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Players on server ${servernumber}`)
                    .setColor('#3f5fd7')
                    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));

                let index = 0;
                let player_job;
                playerNames.forEach(element => { //whats a for loop
                    if (playerJobs[index] === "") {
                        player_job = "undefined";
                    } else player_job = playerJobs[index];
                    nameEmbed.addFields({name: `${element} (${playerID[index]})`, value: player_job, inline: true}); //add player to embed
                    index++
                });
                message.channel.send(nameEmbed)
        });
    }
};
