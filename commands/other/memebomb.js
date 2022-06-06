const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class memeBombCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'memebomb',
            aliases: ['pls-memebomb'],
            memberName: 'memebomb',
            group: 'other',
            description: 'Get a Meme Bomb from reddit.',
        });
    }
    async run(message) {
        let i = 0;
        while(i<=5) {
            i++;
            fetch('https://www.reddit.com/r/memes/random/.json')
                .then(res => res.json())
                .then(json => {
                let permalink = json[0].data.children[0].data.permalink;
                let memeUrl = `https://reddit.com${permalink}`;
                let memeImage = json[0].data.children[0].data.url;
                let memeTitle = json[0].data.children[0].data.title;
                let memeUpvotes = json[0].data.children[0].data.ups;
                let memeDownvotes = json[0].data.children[0].data.downs;
                let memeNumComments = json[0].data.children[0].data.num_comments;
                const embed = new MessageEmbed()
                    .setTitle(`${memeTitle}`, `[View thread](${memeUrl})`)
                    .setImage(memeImage)
                    .setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
                message.channel.send(embed);
            })
        }

    }
};