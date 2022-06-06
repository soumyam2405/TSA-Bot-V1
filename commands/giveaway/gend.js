const {Command} = require('discord.js-commando');

module.exports = class gendCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gend',
            aliases: ['giveaway-end'],
            memberName: 'gend',
            group: 'giveaway',
            description: 'End\'s a Giveaway',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'message_id',
                    prompt: 'Please specify a giveaway message ID',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, {message_id}) {
        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            this.client.giveawaysManager.giveaways.find((g) => g.prize === message_id) ||
            // Search with giveaway ID
            this.client.giveawaysManager.giveaways.find((g) => g.messageID === message_id);

        // If no giveaway was found
        if(!giveaway){
            return message.channel('Unable to find a giveaway for `'+message_id+'`');
        }

        // Edit the giveaway
        this.client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            // Success message
            .then(() => {
                // Success message
                message.channel.send('Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
            })
            .catch((err) => {
                if(err.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                    message.channel.send('This giveaway is not ended!');
                } else {
                    console.error(err);
                    message.channel.send('An error occured...');
                }
            });
    }
}