const Discord = require('discord.js')

exports.run = (client, message, args, eEmb, users, jobs, write, guilds, languages, getTerm) => {
    if(message.author.id !== "561860918724788234") return message.channel.send(`🚫 ${getTerm("Sorry, you can not use this command!")}`)
    
        try {
            delete require.cache[require.resolve(`./${args[0]}.js`)]
        } catch(e) {
            return message.channel.send(`Unable to reload: \`${args[0]}\``)
        }
    
        message.channel.send(`Successfully reloaded: \`${args[0]}\``)
}