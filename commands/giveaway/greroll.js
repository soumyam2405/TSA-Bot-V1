const {Command} = require('discord.js-commando');

module.exports = class grerollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'greroll',
            aliases: ['giveaway-reroll'],
            memberName: 'greroll',
            group: 'giveaway',
            description: 'Reroll a Giveaway',
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

        // Reroll the giveaway
        this.client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                // Success message
                message.channel.send('Giveaway rerolled!');
            })
            .catch((e) => {
                if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                    message.channel.send('This giveaway is not ended!');
                } else {
                    console.error(e);
                    message.channel.send('An error occured...');
                }
            });
    }
}