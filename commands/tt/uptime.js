const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const botconfig = require("../../botconfig.json");
const functions = require("../../functions.js");
const fetch = require('node-fetch');

module.exports = class TTUptimeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'uptime',
      aliases: ['tt-up', 'tt-uptime', 'up', 'uptimes'],
      memberName: 'uptime',
      group: 'tt',
      description: "Replies with TT's Servers current uptime.",
        guildOnly: true
    });
  }
  async run(message) {
      const embed = new MessageEmbed()
          .setTitle("Uptime of all Servers")
          .setColor("RANDOM")
          .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
          .setDescription("<a:loading:714808438768795699> Fetching Server Uptime from TT API...")
          .setColor('#3f5fd7');
      const sendMessage = await message.channel.send(embed);

     function checkServer(index) {
         if (index < botconfig.ActiveServers.length - 1) { //if its not the last server
             setTimeout(() => {
                 checkServer(index + 1) //check next one after 200 ms
             }, 500);
         } else { //last one
             setTimeout(() => {
                 embed.setDescription("");
                 sendMessage.edit(embed)
             }, 1000);
         }

         fetch(`http://${botconfig.ActiveServers[index][0]}:${botconfig.ActiveServers[index][1]}/info.json`)
             .catch(err => {
                 embed.addFields({name: functions.GetServerNumber(botconfig.ActiveServers[index][0], botconfig.ActiveServers[index][1]), value: "OFFLINE", inline: true});
                 sendMessage.edit(embed);
             })
             .then(res => res.json())
             .then(json => {
             embed.addFields({name: functions.GetServerNumber(botconfig.ActiveServers[index][0], botconfig.ActiveServers[index][1]), value: json.vars.Uptime, inline: true})
             sendMessage.edit(embed)
         });
     }

     checkServer(0); //Run recursive function starting at index 0
  }
};
