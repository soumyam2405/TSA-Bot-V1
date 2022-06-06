const fetch = require('node-fetch');
const {openweathermapAPI} = require('../../config.json');
const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');

module.exports = class WeatherCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            aliases: [],
            group: 'other',
            memberName: 'weather',
            description: 'Gives you the current weather of a city.',
            throttling: {
                usages: 2,
                duration: 10
            },
            args: [
                {
                    key: 'city',
                    prompt: 'Please specify the name of the city you want to get the current weather from.',
                    type: 'string',
                }
            ]
        });
    }

    run(message, {city}) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openweathermapAPI}`)
            .then(res => res.json())
            .then(json => {
                if (json.sys.country === "US") {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${openweathermapAPI}`)
                        .then(res => res.json())
                        .then(json => {
                            const embed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(`Current Weather in ${json.name}`, `https://openweathermap.org/img/wn/${json.weather[0].icon}.png`)
                                .setThumbnail(`https://openweathermap.org/img/wn/${json.weather[0].icon}.png`)
                                .addFields([
                                    {
                                        name: `Current Temperature`,
                                        value: `${Math.round(json.main.temp)}${String.fromCharCode(176)}F`,
                                        inline: true
                                    },
                                    {
                                        name: `Feels Like`,
                                        value: `${Math.round(json.main.feels_like)}${String.fromCharCode(176)}F`,
                                        inline: true
                                    },
                                    {
                                        name: `Max Temperature`,
                                        value: `${Math.round(json.main.temp_max)}${String.fromCharCode(176)}F`,
                                        inline: true
                                    },
                                    {
                                        name: `Min Temperature`,
                                        value: `${Math.round(json.main.temp_min)}${String.fromCharCode(176)}F`,
                                        inline: true
                                    },
                                    {name: `Wind Speed`, value: `${json.wind.speed} mph`, inline: true},
                                    {name: `Wind direction`, value: `${json.wind.deg}${String.fromCharCode(176)}`, inline: true},
                                    {name: `Current Weather`, value: `${json.weather[0].description}`, inline: true}
                                ]);
                            return message.say(embed);
                        })
                } else {
                    const embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Current Weather in ${json.name}`, `https://openweathermap.org/img/wn/${json.weather[0].icon}.png`)
                        .setThumbnail(`https://openweathermap.org/img/wn/${json.weather[0].icon}.png`)
                        .addFields([
                            {
                                name: `Current Temperature`,
                                value: `${Math.round(json.main.temp)}${String.fromCharCode(176)}C`,
                                inline: true
                            },
                            {
                                name: `Feels Like`,
                                value: `${Math.round(json.main.feels_like)}${String.fromCharCode(176)}C`,
                                inline: true
                            },
                            {
                                name: `Max Temperature`,
                                value: `${Math.round(json.main.temp_max)}${String.fromCharCode(176)}C`,
                                inline: true
                            },
                            {
                                name: `Min Temperature`,
                                value: `${Math.round(json.main.temp_min)}${String.fromCharCode(176)}C`,
                                inline: true
                            },
                            {name: `Wind Speed`, value: `${json.wind.speed} km/h`, inline: true},
                            {name: `Wind direction`, value: `${json.wind.deg}${String.fromCharCode(176)}`, inline: true},
                            {name: `Current Weather`, value: `${json.weather[0].description}`, inline: true}
                        ]);
                    return message.say(embed);

                }
            })
            .catch(e => {
                message.say('Request to fetch weather for that city failed :(');
                return console.error(e);
            });
    }
};
