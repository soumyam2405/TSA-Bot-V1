const { Command } = require('discord.js-commando');

module.exports = class SetActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stream',
            aliases: ['streaming'],
            memberName: 'stream',
            group: 'owner-only',
            description: 'Not to be used by a normal user.',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'activity',
                    prompt: 'What do you want the bot to do?',
                    type: 'string'
                },
                {
                    key: 'streamurl',
                    prompt: 'KNOB GIMME A TWITCH URL OR BAN!!',
                    type: 'string'
                }
            ]
        });
    }

    run(message, { activity,  streamurl}) {
        this.client.user.setActivity(activity, { type: 'STREAMING', url: streamurl});
        message.channel.send(`I am now streaming :sunglasses:`);
    }
};
