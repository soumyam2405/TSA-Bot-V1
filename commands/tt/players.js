const {Command} = require('discord.js-commando');
const botconfig = require("../../botconfig.json");
const { MessageEmbed } = require('discord.js');
const functions = require("../../functions.js");
const fetch = require('node-fetch');

module.exports = class TTPlayerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'players',
            aliases: ['player', 'tt-player', 'tt-players'],
            memberName: 'players',
            group: 'tt',
            description: "Replies with TT's Servers player count.",
            guildOnly: true
        });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setTitle("Players")
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("<a:loading:714808438768795699> Fetching Players from TT API...")
            .setColor('#3f5fd7')
        const sendMessage = await message.channel.send(embed);
        let ServerPoints = []; //Keeps num of players in each server

        checkServer(0);

        function checkServer(index) { //Find people heisting in server
            if (index < botconfig.ActiveServers.length - 1) { //if its not the last server
                setTimeout(() => {
                    checkServer(index + 1) //check next one after 500 ms
                }, 500);
            } else { //last one
                setTimeout(() => { //after 1000 ms
                    functions.SortPlayersOnServers(ServerPoints, sendMessage, embed); //sort it into array
                }, 1000);
            }

            fetch(`http://${botconfig.ActiveServers[index][0]}:${botconfig.ActiveServers[index][1]}/status/widget/players.json`)
                .catch(err => {
                    embed.addFields({name: `Server ${functions.GetServerNumber(botconfig.ActiveServers[index][0], botconfig.ActiveServers[index][1])}`, value: "OFFLINE", inline: true});
                    sendMessage.edit(embed)

                })
                .then(res => res.json())
                .then(json => {
                    let maxPlayers = json.server.limit;
                    let CurrentServerPoints = 0; //start at 0 people playing

                    json.players.forEach(player => { //loop through all players
                        CurrentServerPoints++ //if player is in company increase score
                    });

                    if (botconfig.ActiveServers[index][0] === "na.tycoon.community") { //if the ip starts with na
                        if (botconfig.ActiveServers[index][1].endsWith("0")) { //if port ends with 0
                            ServerPoints.push([CurrentServerPoints, "6", maxPlayers]) //Add array into array [points, server num]
                        } else if (botconfig.ActiveServers[index][1].endsWith("5")) { //port ends with 5
                        ServerPoints.push([CurrentServerPoints, "A", maxPlayers]) //Server A
                    } else { //port ends with whatever is
                        ServerPoints.push([CurrentServerPoints, 5 + parseInt(botconfig.ActiveServers[index][1].charAt(botconfig.ActiveServers[index][1].length - 1)), maxPlayers]) //Server num is last port num + 5
                    }
                } else { //not na
                    if (botconfig.ActiveServers[index][1].endsWith("0")) { //port ends with 0
                        ServerPoints.push([CurrentServerPoints, "1", maxPlayers]) //server 1
                    } else { //port ends with something else
                        ServerPoints.push([CurrentServerPoints, botconfig.ActiveServers[index][1].charAt(botconfig.ActiveServers[index][1].length - 1), maxPlayers]) //server num is last num of port
                    }
                }
            });
        }
    }
};
