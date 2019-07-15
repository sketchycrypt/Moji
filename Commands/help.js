const discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args, eEmb, users, jobs, write, guilds, languages, getTerm) => {
    {
        try {
            if (args[0] == null) {
                const embed = new discord.RichEmbed()
                    .setTitle(`Moji | Main | ${message.author.tag}`)
                    .addField(`📜 ${getTerm("General")}`, "`m!help general`", true)
                    .addField(`🎲 ${getTerm("Gaming")}`, "`m!help gaming`", true)
                    .addField(`🎵 ${getTerm("Music")}`, "`m!help music`", true)
                    .addField(`❓ ${getTerm("Miscellaneous")}`, "`m!help misc`", true)
                    .addField(`🛠 ${getTerm("Moderation")}`, "`m!help mod`", true)
                    .addField(`⚙ ${getTerm("Settings")}`, "`m!help settings`", true)
                    .setTimestamp()
                    .setColor(0x7732CA)
                message.channel.send(embed);
            }
        }
        catch (e) {
            eEmb(e);
        }
    }
}