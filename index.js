const {CommandoClient} = require('discord.js-commando');
const {Structures, MessageEmbed} = require('discord.js');
const path = require('path');
const fetch = require('node-fetch');
const {prefix, token, owner} = require('./config.json');
const schedule = require('node-schedule');
const config = require('./config.json');
const fs = require('fs');
const botconfig = require("./botconfig.json");
const {GiveawaysManager} = require('discord-giveaways');

Structures.extend('Guild', function(Guild) {
  class MusicGuild extends Guild {
      constructor(client, data) {
          super(client, data);
          this.musicData = {
              queue: [],
              isPlaying: false,
              nowPlaying: null,
              songDispatcher: null,
              skipTimer: false, // only skip if user used leave command
              loopSong: false,
              loopQueue: false,
              volume: 1
          };
          this.triviaData = {
              isTriviaRunning: false,
              wasTriviaEndCalled: false,
              triviaQueue: [],
              triviaScore: new Map()
          };
      }
  }

    return MusicGuild;
});

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owner,
});


client.config = config;
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['giveaway', 'Giveaway related Commands'],
        ['guild', 'Guild related commands'],
        ['management', 'Management Commands'],
        ['music', 'Music Command Group'],
        ['other', 'random types of commands group'],
        ['owner-only', 'Owner-Only commands'],
        ['tt', 'Transport Tycoon commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {
    client.user.setActivity('Transport Tycoon', 'PLAYING');
    const Guilds = client.guilds.cache.map(guild => guild.name);
    console.log(Guilds, 'Connected!');
});
client.on('voiceStateUpdate', async (___, newState) => {
    if (
        newState.member.user.bot &&
        !newState.channelID &&
        newState.guild.musicData.songDispatcher &&
        newState.member.user.id == client.user.id
    ) {
        newState.guild.musicData.queue.length = 0;
        newState.guild.musicData.songDispatcher.end();
        return;
    }
    if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id &&
        !newState.selfDeaf
    ) {
        newState.setSelfDeaf(true);
    }
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        client.on(evtName, evt.bind(null, client));
    });
});

schedule.scheduleJob('*/30 * * * *', async function () {
    let factionmsg = await client.channels.cache.get('578238934266413096').messages.fetch('764120050114101299');
    const embed = new MessageEmbed()
        .setTitle('Live Faction Stats')
        .setFooter('Refreshes every 30 minutes | Last Updated')
        .setTimestamp()
        .setThumbnail(client.guilds.cache.get('574971191014588436').iconURL({dynamic: true}))
        .setColor('#3f5fd7')
        .addFields([
            {name: 'Tag', value: 'TSA', inline: true},
            {name: 'Faction Name', value: 'Transport Security', inline: true},
        ]);
    fetch('http://server.tycoon.community:30124/status/faction/size.json', {
        headers: {'X-Tycoon-Key': config.tycoonAPIKey},
    })
        .then(res => res.json())
        .then(json => {
            embed.addField('Total Amount of Members', json[0], true);
            client.channels.cache.get('764118877948346400').edit({name: `Faction Members: ${json[0]}`})
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
                            factionmsg.edit(embed);
                        })
                        .catch(err => {
                            return console.error(err);
                        });
                })
                .catch(err => {
                    return console.error(err);
                });
        })
        .catch(err => {
            return console.error(err);
        });
});

let notified = 0;

schedule.scheduleJob('*/10 * * * *', function () {
    if (prefix === 't.') return;
    checkServer(0); //Check server 1

    function checkServer(index) {
        if (index < botconfig.ActiveServers.length - 1) { //if its not the last server
            setTimeout(() => {
                checkServer(index + 1) //check next one after 500 ms
            }, 500);
        } else { //last one
            return;
        }

        fetch(`http://${botconfig.ActiveServers[index][0]}:${botconfig.ActiveServers[index][1]}/status/widget/players.json`) //url to get all players
            .then(res => res.json())
            .then(json => {
                let connectCMD;
                if (json.server.dxp[0]) {
                    const servernumber = json.server.number.toUpperCase();
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
                    let time = Date.now() + json.server.dxp[2];
                    let hours = new Date(time).getUTCHours(), minutes = new Date(time).getMinutes();
                    let connectURL = `https://lordhuhn.com/connect/S${json.server.number}`;
                    const embed = new MessageEmbed()
                        .setTitle("Double EXP Event")
                        .setColor("#4169e1")
                        .setThumbnail(`https://i.imgur.com/5GU986U.gif`)
                        .addFields([
                            {name: "Connect URL", value: connectURL},
                            {name: "Connect Command (F8)", value: connectCMD[servernumber]}
                        ])
                        .setDescription(`**Server ${json.server.number} (Ends at ${hours}:${minutes} GMT)**`)
                        .setTimestamp(time)
                        .setFooter('Ends')
                    if (notified < json.server.dxp[2]) {
                        client.channels.cache.get('719880880344137788').send('<@&717811264293961740>', embed).then(msg => msg.crosspost());
                        notified = json.server.dxp[2];
                    } else {
                        client.channels.cache.get('719880880344137788').send(embed).then(msg => msg.crosspost());
                    }
                }
            });
    }
});

client.login(token);
