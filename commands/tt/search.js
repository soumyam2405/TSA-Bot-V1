const {Command} = require('discord.js-commando');
const botconfig = require("../../botconfig.json");
const { MessageEmbed } = require('discord.js');
const functions = require("../../functions.js");
const fetch = require('node-fetch');

module.exports = class TTPlayerSearchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'search',
            aliases: ['player-id', 'search-player', 'tt-player-search', 'tt-search'],
            memberName: 'search',
            group: 'tt',
            description: "Search for a player by his ID in all Servers.",
            guildOnly: true,
            args: [
                {
                    key: 'playerID',
                    prompt: 'Please provide a valid PlayerID or Name.',
                    type: 'string',
                    //validate: playerID => playerID.length > 0 && playerID.length < 7
                }
            ]
        });
    }

    async run(message, {playerID}) {
        const numbers = /^[0-9]+$/;
        const embed = new MessageEmbed()
            .setTitle("Players")
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("<a:loading:714808438768795699> Searching that Player...")
            .setColor('#3f5fd7');
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
                    functions.SearchPlayersOnServers(ServerPoints, embed, sendMessage); //sort it into array
                }, 1000);
            }

            fetch(`http://${botconfig.ActiveServers[index][0]}:${botconfig.ActiveServers[index][1]}/status/widget/players.json`) //url to get all players
                .then(res => res.json())
                .then(json => {
                playerID = String(playerID).toLowerCase();

                let CurrentServerPoints = 0; //start at 0 people playing

                if (playerID.match(numbers)) {
                    json.players.forEach(player => { //loop through all players
                        if(player[2]===null) {
                            return;
                        }
                        if (playerID.includes(player[2].toString())) {
                            CurrentServerPoints++;
                        } //if player is in company increase score
                    });
                } else {
                    json.players.forEach(player => { //loop through all players
                        if(player[0]===null) {
                            return;
                        }
                        if ((String(player[0].toString()).toLowerCase()).includes(playerID)) {
                            CurrentServerPoints++;
                        } //if player is in company increase score
                    });
                }
                if(CurrentServerPoints===0) {
                    return;
                }
                else if(CurrentServerPoints===1) {
                        json.players.forEach(player => { //loop through all players
                            if(player[0]===null) {
                                return;
                            }
                            if ((String(player[0].toString()).toLowerCase()).includes(playerID)){
                                CurrentServerPoints=[`${player[0]} (${player[5]})`];
                            }
                        });
                }

                if (botconfig.ActiveServers[index][0] === "na.tycoon.community") { //if the ip starts with na
                    if (botconfig.ActiveServers[index][1].endsWith("0")) { //if port ends with 0
                        ServerPoints.push([CurrentServerPoints, "6"]) //Add array into array [points, server num]
                    } else if (botconfig.ActiveServers[index][1].endsWith("5")) { //port ends with 5
                        ServerPoints.push([CurrentServerPoints, "A"]) //Server A
                    } else { //port ends with whatever is
                        ServerPoints.push([CurrentServerPoints, 5 + parseInt(botconfig.ActiveServers[index][1].charAt(botconfig.ActiveServers[index][1].length - 1))]) //Server num is last port num + 5
                    }
                } else { //not na
                    if (botconfig.ActiveServers[index][1].endsWith("0")) { //port ends with 0
                        ServerPoints.push([CurrentServerPoints, "1"]) //server 1
                    } else { //port ends with something else
                        ServerPoints.push([CurrentServerPoints, botconfig.ActiveServers[index][1].charAt(botconfig.ActiveServers[index][1].length - 1)]) //server num is last num of port
                    }
                }
            });
        }
    }
};
