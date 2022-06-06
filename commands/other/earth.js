const commando = require('discord.js-commando');
const fetch = require('node-fetch')

module.exports = class EarthCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'earth',
            aliases: ['earth-photo'],
            group: 'other',
            memberName: 'earth',
            description: "View a photo of Earth from space!",
            details: `View a photo of Earth from space!`,
            examples: [],
        });
    }

    async run(message) {
        let msg = await message.channel.send("Pinging the Nasa Database for live earth footage . . .")
        const earth_link = "https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY"

        fetch(earth_link)
            .then(res => res.json())
            .then((out) => {
                const earth_output = out;

                const randomNumber = getRandomNumber(0, earth_output.length - 1)
                const image_name = earth_output[randomNumber].image

                const date = earth_output[randomNumber].date;
                const date_split = date.split("-")

                const year = date_split[0];

                const month = date_split[1];

                const day_and_time = date_split[2];
                const sliced_date = day_and_time.slice(0, 2);

                const image_link = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png"
                msg.edit(`${image_link}\n${earth_output[randomNumber].caption} on ${date}`)
            })
            .catch(err => { throw err });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }


};