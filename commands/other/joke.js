const fetch = require('node-fetch');
const {Command} = require('discord.js-commando');

module.exports = class JokeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'joke',
            aliases: [],
            group: 'other',
            memberName: 'joke',
            description: 'Generate a random joke!',
            throttling: {
                usages: 1,
                duration: 6
            },
        });
    }

    async run(message) {
        const response = await fetch('https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw');
        const json = await response.json();
                if (json.type === "single") {
                    if (json.flags.racist === true) {
                        await message.channel.send(`***!!RACIST JOKE!!***`);
                        message.channel.send(`|| ${json.joke} ||`);
                    }
                    else message.channel.send(json.joke);
                } else {
                    if (json.flags.racist === true) {
                        await message.channel.send(`***!!RACIST JOKE!!***`);
                        await message.channel.send(`|| ${json.setup} ||`);
                        message.channel.startTyping(true);
                        setTimeout(async function () {
                            await message.channel.send(`|| ${json.delivery} ||`);
                            message.channel.stopTyping(true);
                        }, 8000);
                    } else {
                        await message.channel.send(json.setup);
                        message.channel.startTyping(true);
                        setTimeout(async function () {
                            await message.channel.send(json.delivery);
                            message.channel.stopTyping(true);
                        }, 8000);
                    }
                }
    }
};
