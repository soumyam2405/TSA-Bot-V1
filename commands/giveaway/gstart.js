const ms = require('ms');
const {Command} = require('discord.js-commando');

module.exports = class gstartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gstart',
            aliases: ['gcreate', 'giveaway-start', 'giveaway-create'],
            memberName: 'gstart',
            group: 'giveaway',
            description: 'Start a Giveaway (require\'s the Santa role)',
            guildOnly: true,
            args: [
                {
                    key: 'giveawayChannel',
                    prompt: 'Please specify in which channel the giveaway should go',
                    type: 'string'
                },
                {
                    key: 'giveawayDuration',
                    prompt: 'How long should the giveaway last?',
                    type: 'string'
                },
                {
                    key: 'giveawayNumberWinners',
                    prompt: 'How many winners?',
                    type: 'string'
                },
                {
                    key: 'giveawayPrize',
                    prompt: 'What do you want to giveaway?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, {giveawayChannel, giveawayDuration, giveawayNumberWinners, giveawayPrize}) {
        if(isNaN(giveawayChannel)===false) message.guild.channels.cache.get(giveawayChannel);
        else giveawayChannel = message.guild.channels.cache.get(giveawayChannel.replace('<#', '').replace('>', ''));
        // If the member doesn't have enough permissions
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Santa")) {
            return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
        }

        // If the duration isn't valid
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':x: You have to specify a valid duration!');
        }

        // If the specified number of winners is not a number
        if (isNaN(giveawayNumberWinners)) {
            return message.channel.send(':x: You have to specify a valid number of winners!');
        }

        // Start the giveaway
        this.client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            time: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: giveawayNumberWinners,
            // Who hosts this giveaway
            hostedBy: this.client.config.hostedBy ? message.author : null,
            // Messages
            messages: {
                giveaway: (this.client.config.everyoneMention ? "@everyone\n\n" : "") + "🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: (this.client.config.everyoneMention ? "@everyone\n\n" : "") + "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });

        message.channel.send(`Giveaway started in ${giveawayChannel}!`);

    }
}