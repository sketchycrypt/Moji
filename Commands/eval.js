const discord = require('discord.js')

exports.run = (client, message, args, eEmb, users, jobs, write, guilds, languages, getTerm) => {
        if(message.author.id !== "561860918724788234") return message.channel.send(`🚫 ${getTerm("Sorry, you can not use this command!")}`)
    
        try {
            try {
              const code = message.content.replace("m!eval", "");
              let evaled = eval(code);
            
              if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
            
              var embed = new discord.RichEmbed()
              .setColor(0x7732CA)
              .setTitle("Moji Eval!")
              .addField(`${getTerm("Input")}:`, `\`\`\`js\n${code}\`\`\``)
              .addField(`${getTerm("Output")}:`, `\`\`\`js\n${clean(evaled)}\`\`\``)
              message.channel.send(embed)
            } catch (err) {
              message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }

            function clean(text) {
                if (typeof(text) === "string")
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
              }
        } catch(e) {
            eEmb(e)
        }
}