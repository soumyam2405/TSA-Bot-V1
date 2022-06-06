const botconfig = require("./botconfig.json");
const { MessageEmbed } = require('discord.js');
const {
    google
} = require('googleapis'); //allows you to use googles api
const Discord = require("discord.js");

module.exports = {
    /**
     * @summary Takes a string and converts it to a number even if it has commas or dollar signs
     * @param {String} number The string you want to turn into an int
     * @returns {Number} Converted number
     */
    ConvertNumber: function (number) {
        if (!number) number = "0"; //if its null then set to "0"

        if (number.includes(",")) { //if it has a comma
            number = number.replace(/,/g, "") //replace all commas with nothing
        }

        if (number.includes("$")) { //if it has a dollar sign
            number = number.replace(/\$/g, "") //replace all dollar signs with nothing
        }

        number = parseInt(number); //Parse the string into a Number

        return number;
    },

    /**
     * @summary Gets the index of the search column and the id for use in spreadsheets
     * @param {Discord.Message} message The original message
     * @param {Array<String>} args args provided with command
     * @returns {[Number, String]} [SearchColumn, ID]
     */
    GetIDAndSearchColumn: function (message, args) {
        const Response = [];
        if (!args[0]) return Response;
        if (message.mentions.members.first()) args[0] = message.mentions.members.first().id; //If theres a message mention then the first arg is the mention id instead of the mention

        if (args[0].length > 6) { //if the ID is longer than 6 chars
            Response.push("discord_id"); //index 0 is the index of discord ids in the rts spreadsheet
            Response.push(args[0]) //index 1 is the provided ID
        } else if (args[0]) { //if its less than or equal to 6 chars and isn't null
            Response.push("in_game_id"); //index 0 is the index of in game id's
            Response.push(args[0])
        }

        return Response;
    },

    /**
     * @summary Changes the deadline for a member
     * @param {Discord.Client} bot The Discord bot
     * @param {String} Deadline New deadline for the user
     * @param {String} column The column with the ID
     * @param {String} ID The ID of the user
     * @param {Discord.GuildChannel} channel Discord channel to send messages
     */
    ChangeDeadline: function (bot, Deadline, column, id, channel) {
        bot.con.query(`UPDATE members SET deadline = '${Deadline}' WHERE ${column}='${id}'`, function (err, result, fields) { //set the deadline to specified deadline for the member
            if (err) return console.log(err);
            else if (result.affectedRows == 0) return channel.send("Unable to find that member"); //not found member
            else {//found
                channel.send(`Set deadline to ${Deadline}`)
            }
        })
    },

    GetClientUptime: function(uptime){
        let messagetemp;
        let days = 0;
        let week = 0;
        let totalSeconds = (uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        while(hours > 23) {
            days++;
            hours = hours - 24;
        }

        while(days >= 7) {
            week++;
            days = days - 7;
        }


        if(minutes > 60){
            messagetemp = (`An error has occured here is some debug info: ${uptime}`);
            return messagetemp;
        }
        seconds = Math.round(seconds);

        if(week>0) messagetemp = `**${week}** weeks, **${days}** days, **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`;
        else if(days>0) messagetemp = `**${days}** days, **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`;
        else if(hours>0) messagetemp = `**${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`;
        else if(minutes>0) messagetemp = `**${minutes}** minutes and **${seconds}** seconds`;
        else if(seconds>0) messagetemp = `**${seconds}** seconds`;
        else {
            messagetemp = (`An error has occured here is some debug info: ${uptime}`);
            return messagetemp;
        }
        return messagetemp;
    },



    GetBotinfoUptime: function(uptime){
        let messagetemp;
        let days = 0;
        let week = 0;
        let totalSeconds = (uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        while(hours > 23) {
            days++;
            hours = hours - 24;
        }

        while(days >= 7) {
            week++;
            days = days - 7;
        }


        if(minutes > 60){
            messagetemp = (`An error has occured here is some debug info: ${uptime}`);
            return messagetemp;
        }
        seconds = Math.round(seconds);

        if(week>0) messagetemp = `${week}w, ${days}d, ${hours}h, ${minutes}m and ${seconds}s`;
        else if(days>0) messagetemp = `${days}d, ${hours}h, ${minutes}m and ${seconds}s`;
        else if(hours>0) messagetemp = `${hours}h, ${minutes}m and ${seconds}s`;
        else if(minutes>0) messagetemp = `${minutes}m and ${seconds}s`;
        else if(seconds>0) messagetemp = `${seconds}s`;
        else {
            messagetemp = (`An error has occured here is some debug info: ${uptime}`);
            return messagetemp;
        }
        return messagetemp;
    },

    /**
     * @summary Gets the server IP and port number when a user types in a server number
     * @param {String} ServerNumber Specified server number
     * @returns {[String, Number]} [Server IP, Last server Port number]
     */
    GetServerIPandPort: function (ServerNumber) {
        let server = parseInt(ServerNumber); //convert the string to an int

        if (ServerNumber.toLowerCase() === "a") { //if the server number is A
            var serverIP = "na.tycoon.community"; //ip is na
            server = 5 //last port number is 5
        } else if (server > 1 && server < 6) { //if the server number is higher than 1 and less than 6
            var serverIP = "server.tycoon.community" //server ip is server. and last port number is the same provided in the servernumber
        } else if (server == 0) { //if they say server 0
            var serverIP = "server.tycoon.community"; //server ip is server.
            server = 1 //last port number is 1
        } else if (server > 6) { //if the number is higher than 6
            var serverIP = "na.tycoon.community"; //na.
            server -= 5 //last port number is that number minues 5
        } else if (server == 1) {
            var serverIP = "server.tycoon.community";
            server = 0;
        } else { //any other server
            var serverIP = "na.tycoon.community"; //na.
            server = 0 //server port is 0
        }

        return [serverIP, server]
    },

    /**
     * @summary Gets the english server number
     * @param {String} serverIP Specified server ip
     * @param {String} serverPort Specified server port
     * @returns {String]} The server number or IDK
     * @return {string}
     */
    GetServerNumber: function (serverIP, serverPort) {
        switch (`${serverIP}:${serverPort}`) {
            case "server.tycoon.community:30120":
                return "1";
            case "server.tycoon.community:30122":
                return "2";
            case "server.tycoon.community:30123":
                return "3";
            case "server.tycoon.community:30124":
                return "4";
            case "server.tycoon.community:30125":
                return "5";
            case "na.tycoon.community:30120":
                return "6";
            case "na.tycoon.community:30122":
                return "7";
            case "na.tycoon.community:30123":
                return "8";
            case "na.tycoon.community:30124":
                return "9";
            case "na.tycoon.community:30125":
                return "A";
            default:
                return "idk"
        }
    },

    /**
     * @summary Takes all the number of players on each server and makes it into a message. technically they are already sorted
     * @param {[[String,String]]} PlayersArray [[Num of players, server port]]
     * @returns {String} Sentence about how many players are on
     */
    SortPlayersOnServers: function (PlayersArray, sendMessage, embed) {
        for (let i = 0; i < PlayersArray.length; i++) { //go through all of them
            embed.addFields({name: `Server ${PlayersArray[i][1]}`, value: `${PlayersArray[i][0]}/${PlayersArray[i][2]}`, inline: true}) //Adds the server
            sendMessage.edit(embed);
        }
        embed.setDescription("");
        sendMessage.edit(embed);

        return embed;
    },



    SearchPlayersOnServers: function (PlayersArray, embed, sendMessage) {


        let temp;
        if(PlayersArray[0]===undefined){
            embed.setDescription("❌ Could not find that player ❌");
            embed.setColor("#df3636")
            return sendMessage.edit(embed);
        }
        embed.setColor("#63db5a")
        for (let i = 0; i < PlayersArray.length; i++) { //go through all of them
            if(PlayersArray[i][0]>1) {
                temp = "players";
            }
            else {
                temp = "";
            }
            embed.addFields({name: `Server ${PlayersArray[i][1]}`, value: `${PlayersArray[i][0]} ${temp}`, inline: true}) //Adds the server
            sendMessage.edit(embed);
        }
        embed.setDescription("");
        sendMessage.edit(embed);

        return embed;
    },

    getMember: function(message, toFind) {
        toFind = toFind.toLowerCase();
        let target = message.guild.members.cache.get(toFind);
        if (!target && message.mentions.members)
            target = message.mentions.members.first();
        if (!target && toFind) {
            target = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
            });
        }
        if (!target)
            target = message.member;

        target = target.user;
        return target;
    },

    getAvatar: function(user) {
        let useravatar = user.avatar;
        if (useravatar !== null) {
            if (useravatar.startsWith(`a_`)) {
                useravatar = user.displayAvatarURL({format: "gif", dynamic: true});
            } else {
                useravatar = user.displayAvatarURL({format: "png", dynamic: false});
            }
        }
        return useravatar;
    },


    /**
     * @callback RowCallback
     * @param {Array<String>} row The row
     */

    /**g
     * @summary Loop through all rows in range and run a function
     * @param {OAuth2Client} auth Google auth
     * @param {String} SpreadsheetID The spreadsheet
     * @param {String} Range Range
     * @param {Discord.GuildChannel} channel The channel
     * @param {RowCallback} callback What to do for each row
     */
    ProcessAllInRange: function (auth, SpreadsheetID, Range, channel, callback) {
        return new Promise(resolve => {
            const sheets = google.sheets({
                version: 'v4',
                auth
            });

            sheets.spreadsheets.values.get({ //get spreadsheet range
                spreadsheetId: SpreadsheetID,
                range: Range,
            }, async (err, res) => {
                if (err) {
                    channel.send('The API returned an ' + err);
                    return;
                }

                const rows = res.data.values;
                if (rows.length) {
                    rows.map(async (row) => { //for each row in rows run the callback function with the row
                        await callback(row)
                    });
                    resolve();
                }

            })
        })
    },

    /**
     * @summary Gets the details for the member with the ID in the search column
     * @param {Discord.Client} bot Alfred
     * @param {String} Column discord iD or in game id
     * @param {String} ID the id
     * @returns {Array<String>} All their info
     */
    GetMemberDetails: function (bot, Column, ID) {
        return new Promise(resolve => {
            bot.con.query(`SELECT * FROM members, rts, pigs WHERE members.${Column} = '${ID}' AND members.in_game_id = pigs.in_game_id AND members.in_game_id = rts.in_game_id`, function (err, result, fields) { //get all their info into one array
                if (err) return console.log(err);
                resolve(result[0]) //return first found member
            })
        })

    },

    /**
     * @callback ApplicantCallback
     * @param {Array<String>} row Row with all applicant data
     * @param {Number} rowIndex Row number in the appsheet
     */
    /**
     * @summary Finds all the info about an applicant
     * @param {OAuth2Client} auth Sheets
     * @param {Discord.GuildChannel} channel Discord channel
     * @param {String} ID Member ID
     * @param {Number} SearchColumn Column with the ID
     * @param {Number} CompanyIndex Index of the sign me up column
     * @param {ApplicantCallback} callback What to run when finding member
     */
    FindApplicant: function (auth, channel, ID, SearchColumn, CompanyIndex, callback) {
        return new Promise(resolve => {
            const sheets = google.sheets({
                version: 'v4',
                auth
            });

            sheets.spreadsheets.values.get({ //get range
                spreadsheetId: botconfig.Applications,
                range: botconfig.ApplicationRange,
            }, (err, res) => {
                if (err) return channel.send('The API returned an ' + err);

                const rows = res.data.values;
                if (rows.length) {
                    rows.map(async (row) => {
                        if (ID == "") { //If they don't specify an ID
                            if ((row[SearchColumn] == "Under review" || row[SearchColumn] == "") && row[CompanyIndex] == "Sign me up!") { //If their status is Under review or no status and the applicant applied for the company
                                await callback(row, rows.indexOf(row) + botconfig.ApplicationStartingRow)
                            }
                        } else {
                            if (row[SearchColumn] == ID && row[CompanyIndex] == "Sign me up!") { //If its the right applicant for the right company
                                await callback(row, rows.indexOf(row) + botconfig.ApplicationStartingRow);
                            }
                        }
                    });
                    resolve();
                }
            })
        })
    },

    /**
     * @summary Updates the status of an applicant
     * @param {OAuth2Client} auth Sheets
     * @param {Discord.GuildChannel} channel Discord channel
     * @param {String} ID The ID of the applicant
     * @param {Number} CompanyIndex The sign me up column index
     * @param {String} Status What to change their status too
     * @param {String} [Column=A] What column the status is
     */
    UpdateApplicantStatus: function (auth, channel, ID, CompanyIndex, Status, Column) {
        if (!Column) Column = "A";
        return new Promise(async resolve => {
            const sheets = google.sheets({
                version: 'v4',
                auth
            });
            await this.FindApplicant(auth, channel, ID, botconfig.ApplicationInGameIDIndex, CompanyIndex, async function (row, RowIndex) { //Find all applicants with the ID
                return new Promise(resolve => {
                    sheets.spreadsheets.values.update({
                        auth: auth,
                        spreadsheetId: botconfig.Applications,
                        range: `${Column}${RowIndex}:${Column}${RowIndex}`,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            majorDimension: "COLUMNS",
                            values: [
                                [Status]
                            ] //Change column A in RowIndex to the status
                        }
                    }, (err, response) => {
                        if (err) {
                            channel.send('The API returned an error: ' + err);

                        } else {
                            channel.send(`Marked applicant as ${Status}`);
                            resolve()
                        }
                    })
                })
            });
            resolve();
        })
    },

    /**
     * @summary Gets the discord of an applicant
     * @param {OAuth2Client} auth Sheets Auth
     * @param {Discord.GuildChannel} channel Discord channel
     * @param {String} ID Member ID
     * @param {Number} SignMeUpIndex Index of Sign Me Up! in application sheet
     * @returns {String} Either discord ID or the string they typed in application if not found
     */
    GetDiscordFromID: async function (auth, channel, ID, SignMeUpIndex) {
        return new Promise(async resolve => {
            let Discord;
            await this.FindApplicant(auth, channel, ID, botconfig.ApplicationInGameIDIndex, SignMeUpIndex, async function (row) { //Find applicant
                return new Promise(res => {
                    let Discriminator = row[botconfig.ApplicationDiscordIndex].split("#")[1]; //Gets the discrim number
                    let Username = row[botconfig.ApplicationDiscordIndex].split("#")[0].replace(/\s/g, ''); //Gets the username without any spaces
                    Discord = row[botconfig.ApplicationDiscordIndex]; //sets discord variable
                    channel.guild.members.forEach(element => { //search in server members
                        if (element.user.discriminator == Discriminator && element.user.username.replace(/\s/g, '').toLowerCase() == Username.toLowerCase()) { //if the member discrim = app discrim and the username without spaces and lowercase = username lowercase
                            resolve(element.id) //resolves with ID
                        }
                    });
                    res()
                })
            });
            resolve(Discord)
        })
    },

    /**
     * @summary Replaces all pending payouts with clear so that it doesn't show up in .cashout
     * @param {Discord.Client} bot Alfred
     * @param {String} ID Member ID
     * @param {Discord.GuildChannel} channel Discord channel
     */
    PayManager: async function (bot, ID, channel) {
        if (channel.guild.id == "487285826544205845") { //if pigs server
            var CompanyName = "pigs"
        } else {
            var CompanyName = "rts"
        }

        bot.con.query(`UPDATE managers SET total_money = total_money + ${CompanyName}_cashout_worth WHERE discord_id = '${ID}'`, function (err, result, fields) { //add total money
            if (err) return console.log(err);

            bot.con.query(`UPDATE managers SET ${CompanyName}_cashout = '0', ${CompanyName}_cashout_worth = '0' WHERE discord_id = '${ID}'`, function (err, result, fields) { //reset to 0
                if (err) return console.log(err);
                if (result.affectedRows == 1) { //1 row
                    channel.send("Paid.")
                } else { //no row
                    channel.send("Couldn't find that manager")
                }
            })
        })

    },

        /**
     * @summary Returns the number but with handy commas
     * @param {Number} num The big number
     * @returns {String} Number with commas
     */
    numberWithCommas: function (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //fancy regex
    },

    /**
     * @summary Gets the distance between two coords
     * @param {Number} x1 x1
     * @param {Number} y1 y1
     * @param {Number} x2 x2
     * @param {Number} y2 y2
     * @returns {Number} The distance between the two coords
     */
    distanceBetweenCoords: function (x1, y1, x2, y2) { //Get the distance between two x,y coords
        const differenceInX = x2 - x1; //difference in x
        const differenceInY = y2 - y1; //difference in y

        const whatToSqrt = ((differenceInX * differenceInX) + (differenceInY * differenceInY)); //distance formula
        const answer = Math.sqrt(whatToSqrt); //sqrt it

        return answer
    },

    GetInGameID: function (bot, DiscordID) {
        return new Promise(async resolve => {
            bot.con.query(`SELECT in_game_id FROM members WHERE discord_id = '${DiscordID}'`, function (err, result, fields) {
                if (err) resolve(console.log(err));
                else if (result.length < 1) resolve(undefined);
                else resolve(result[0].in_game_id)
            })
        })
    },
    /**
     * @return {string}
     */
    GetAvatarType: function(author) {
        authorAvatar = author.Avatar;
        if (authorAvatar.startsWith(`a_`)) {
            return authorAvatar = author.displayAvatarURL({format: "gif", dynamic: true});
        } else {
            return authorAvatar = author.displayAvatarURL({format: "png", dynamic: false});
        }
    }
};
