const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { yandexAPI } = require('../../config.json');
const ISO6391 = require('iso-639-1');
const fetch = require('node-fetch');

module.exports = class ConversationCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'conversation',
      memberName: 'conversation',
      group: 'other',
      description:
        'Make a conversation with someone who is not your language',
      throttling: {
        usages: 2,
        duration: 12
      },
      args: [
        {
          key: 'targetLang1',
          prompt:
            'What is the first language you want to translate to?',
          type: 'string',
          validate: text => text.length < 3000
        },
        {
            key: 'targetLang2',
            prompt:
              'What is the second language you want to translate to?',
            type: 'string',
            validate: text => text.length < 3000
        }
      ]
    });
  }

  async run(message, { targetLang1, targetLang2 }) {
    const langCode1 = ISO6391.getCode(targetLang1);
    const langCode2 = ISO6391.getCode(targetLang2);
    if (langCode1 === '')
      return message.channel.send('Please provide a valid language!');
    if (langCode2 === '')
      return message.channel.send('Please provide a valid language!');
    var i=0;
    // text needs to be less than 3000 length
    while(i<=100) {
        i++;
        await message.channel.send(
        `Please enter the text you want to translate to ${targetLang1}`
        );

        try {
        const filter = msg => msg.content.length > 0 && msg.content.length < 3000;
        var response = await message.channel.awaitMessages(filter, {
            max: 1,
            maxProcessed: 1,
            time: 90000,
            errors: ['time']
        });
        var text = response.first().content;
        } catch (e) {
        return message.channel.send('You did not enter any text!');
        }
        if(text==="stop") return message.reply(`Ended the conversation`);

        try {
        var res1 = await fetch(
            // Powered by Yandex.Translate http://translate.yandex.com/
            `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPI}&text=${encodeURI(
            text
            )}&lang=${langCode1}`
        );
        const json = await res1.json();
        message.channel.send(embedTranslation1(json.text[0]));
        } catch (e) {
        console.error(e);
        return message.say(
            'Something went wrong when trying to translate the text'
        );
        }

        function embedTranslation1(text) {
        return new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Translation')
            .setDescription(text)
        }

        await message.channel.send(
            `Please enter the text you want to translate to ${targetLang2}`
        );
    
        try {
            const filter = msg => msg.content.length > 0 && msg.content.length < 3000;
            var response = await message.channel.awaitMessages(filter, {
            max: 1,
            maxProcessed: 1,
            time: 90000,
            errors: ['time']
            });
            var text = response.first().content;
        } catch (e) {
            return message.channel.send('You did not enter any text!');
        }

        if(text==="stop") return message.reply(`Ended the conversation`);

        try {
            var res2 = await fetch(
            // Powered by Yandex.Translate http://translate.yandex.com/
            `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPI}&text=${encodeURI(
                text
            )}&lang=${langCode2}`
            );
            const json = await res2.json();
            message.channel.send(embedTranslation2(json.text[0]));
        } catch (e) {
            console.error(e);
            return message.say(
            'Something went wrong when trying to translate the text'
            );
        }
    
        function embedTranslation2(text) {
            return new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Translation')
            .setDescription(text)
        }
    }
  }
};
