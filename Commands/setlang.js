const discord = require('discord.js')
const fs = require('fs');

exports.run = (client, message, args, eEmb, users, jobs, write, guilds, languages) => {
        if(message.author.id !== message.guild.owner.id) return message.channel.send(`🚫 ${getTerm("Sorry, you can not use this command!")}`)
    
        try {
            if(languages[args[0]]) {
                message.channel.send(`Ok, ${message.author}, setting language to **${languages[args[0]].name}**`)
                guilds[message.guild.id].language = args[0];
                write(3);
            }
            else {
                message.channel.send(`Sorry, ${message.author}, I couldnt find **${args[0]}**`)
            }
        } catch(e) {
            eEmb(e)
        }
}