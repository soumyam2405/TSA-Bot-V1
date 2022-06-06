const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');

module.exports = class statsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats-beta',
            aliases: [],
            memberName: 'stats-beta',
            group: 'owner-only',
            ownerOnly: true,
            guildOnly: true,
            description: "Noum8",
            args: [
                {
                    key: 'ID',
                    prompt: 'ID',
                    type: 'string',
                    validate: ID => ID.length > 0 && ID.length < 7
                }
            ]
        });
    }

    async run(message, {ID}) {
        if (ID === null || ID === "" || ID <= 0) {
            ID = 1;
        }
        fetch(`http://server.tycoon.community:30124/status/data/${ID}`)
            .then(res => res.json())
            .then(json => {
                let usergroup = json.data.groups;
                if (usergroup.superadmin !== undefined) usergroup = "Superadmin";
                else if (usergroup.Admin !== undefined || usergroup.admin !== undefined) usergroup = "Admin";
                else if (usergroup.mod !== undefined) usergroup = "Moderator";
                else if (usergroup.support !== undefined) usergroup = "Support";
                else usergroup = "User";
                const embed = new MessageEmbed()
                    .setTitle(`Player Information for ID ${ID}`)
                    .addFields([
                        {name: `Chat Title`, value: `${json.data.chat_title}`},
                        {name: `Chat Prefix`, value: `${json.data.chat_prefix}`},
                        {name: `User Rank`, value: `${usergroup}`},
                        {
                            name: `Mining XP`,
                            value: Math.round(json.data.gaptitudes_v.farming.mining)/*+Math.round(json.data.gaptitudes_v.farming.mining)*/
                        }
                    ]);
                message.channel.send(embed);

                let i = 0;
                /*while(i<15) {
                    inventory_embed= new MessageEmbed();
                    for(let[item, {amount}] of Object.entries(json.data.inventory)) {
                        inventory_embed.addFields({name: item, value: amount});
                        i++;
                        j++;
                    }
                    message.channel.send(inventory_embed);
                    inventory_embed = "";
                    i=0;
                }*/
                let inventory_embed = new MessageEmbed()
                    .setTitle(`Inventory`);
                for(let[item, {amount}] of Object.entries(json.data.inventory)) {
                    inventory_embed.addFields({name: item, value: amount});
                    i++;

                    if(i===20) {
                        message.channel.send(inventory_embed);
                        i=0;
                        inventory_embed = "";
                        inventory_embed = new MessageEmbed()
                            .setTitle(`Inventory`);
                    }
                }
                /*while (i < 15) {
                    inventory_embed.addFields({name: item, value: amount});
                    i++;
                    j++;
                }*/
            })
    }
};
