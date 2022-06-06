const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class CovidCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'covid',
            aliases: ['covid19', 'covid-19', 'corona'],
            group: 'other',
            memberName: 'covid',
            description: 'Replies with the Corona Stats',
            guildOnly: true,
            args: [
                {
                    key: 'country',
                    prompt: 'Please specify a country',
                    type: 'string',
                    default : "none"
                }
            ]
        });
    }

    run(message, {country}) {
        if(country==="none") {
            fetch(`https://disease.sh/v3/covid-19/all`)
                .then(res => res.json())
                .then(json => {
                    const embed = new MessageEmbed()
                        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png")
                        .setTitle("Corona (Covid-19) Status")
                        .addFields([
                            {name: "Today Confirmed", value: json.todayCases, inline: true},
                            {name: "Today Deaths", value: json.todayDeaths, inline: true},
                            {name: "Active Cases", value: json.active, inline: true},
                            {name: "Total Confirmed", value: json.cases, inline: true},
                            {name: "Total Deaths", value: json.deaths, inline: true},
                            {name: "Total Recovered", value: json.recovered, inline: true}
                        ])
                        .setFooter(`Last updated`)
                        .setTimestamp(json.updated)
                    message.channel.send(embed);
                })
                .catch(err => {
                    message.say('Request to get Corona Stats failed :(');
                    return console.log(err);
                });
        }
        else {
            fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
                .then(res => res.json())
                .then(json => {
                    if(json.message) {
                        fetch(`https://disease.sh/v3/covid-19/states/${country}`)
                            .then(res => res.json())
                            .then(json => {
                                if(json.message) {
                                    return message.reply(json.message);
                                }
                                const embed = new MessageEmbed()
                                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png")
                                    .setTitle(`Corona (Covid-19) Status in ${json.state}`)
                                    .addFields([
                                        {name: "Today Confirmed", value: json.todayCases, inline: true},
                                        {name: "Today Deaths", value: json.todayDeaths, inline: true},
                                        {name: "Active Cases", value: json.active, inline: true},
                                        {name: "Total Confirmed", value: json.cases, inline: true},
                                        {name: "Total Deaths", value: json.deaths, inline: true},
                                        {name: "Total Recovered", value: json.recovered, inline: true}
                                    ])
                                    .setFooter(`Last updated`)
                                    .setTimestamp(json.updated)
                                return message.channel.send(embed);
                            })
                    }
                    else {
                        const embed = new MessageEmbed()
                            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png")
                            .setTitle(`Corona (Covid-19) Status in ${json.country}`)
                            .addFields([
                                {name: "Today Confirmed", value: json.todayCases, inline: true},
                                {name: "Today Deaths", value: json.todayDeaths, inline: true},
                                {name: "Active Cases", value: json.active, inline: true},
                                {name: "Total Confirmed", value: json.cases, inline: true},
                                {name: "Total Deaths", value: json.deaths, inline: true},
                                {name: "Total Recovered", value: json.recovered, inline: true}
                            ])
                            .setFooter(`Last updated`)
                            .setTimestamp(json.updated)
                        message.channel.send(embed);
                    }
                })
                .catch(err => {
                    message.say('Request to get Corona Stats failed :(');
                    return console.log(err);
                });
        }
    }
};
