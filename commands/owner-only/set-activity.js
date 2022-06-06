const { Command } = require('discord.js-commando');

module.exports = class SetActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'set-activity',
            aliases: ['setactivity'],
            memberName: 'set-activity',
            group: 'owner-only',
            description: 'Not to be used by a normal user.',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'activitytype',
                    prompt: 'What type of Activity do you want to set?',
                    type: 'string'
                },
                {
                    key: 'activity',
                    prompt: 'What do you want the bot to do?',
                    type: 'string'
                }
            ]
        });
    }

    run(message, { activitytype,  activity}) {
        this.client.user.setActivity(activity, { type: activitytype});
        message.channel.send(`Updated my Activity`);
    }
};
