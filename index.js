//-- Imports --\\
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const fs = require('fs');

//-- JSON Data --\\
const users = JSON.parse(fs.readFileSync('./Data/Users.json', 'utf8'))
const jobs = JSON.parse(fs.readFileSync('./Data/Jobs.json', 'utf8'));
const guilds = JSON.parse(fs.readFileSync('./Data/Guilds.json', 'utf8'));

const languages = JSON.parse(fs.readFileSync('./Data/Languages.json', 'utf8'));

//-- JSON Writer --\\
function write(type) {
    if(type === 1) { //- User Data
        fs.writeFileSync('./Data/Users.json', JSON.stringify(users, null, 4))
    }
    else if(type == 2) { //- Jobs Data
        fs.writeFileSync('./Data/Jobs.json', JSON.stringify(jobs, null, 4));
    }
    else if(type == 3) { //- Guild Data
        fs.writeFileSync('./Data/Guilds.json', JSON.stringify(guilds, null, 4));
    }
}

//-- Number Formatter --\\
function intFormat(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

//-- Login Client --\\
client.login(process.env.token);

//-- Client Ready --\\
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity(`over ${intFormat(client.guilds.size)} guilds | m!help`, {type: "WATCHING"})
})

//-- Guild Handlers --\\
client.on('guildCreate', guild => {
    if(!guilds[guild.id]) guilds[guild.id] = {
        language: "en_uk",
        filter: false,
        commands: 0,
        information: {
            name: guild.name,
            members: guild.memberCount
        }
    }
    write(3);
    client.user.setActivity(`over ${intFormat(client.guilds.size)} guilds | m!help`, {type: "WATCHING"})
})

client.on('guildDelete', guild => {
    if(guilds[guild.id]) delete guilds[guild.id];
    write(3);
    client.user.setActivity(`over ${intFormat(client.guilds.size)} guilds | m!help`, {type: "WATCHING"})
})

//-- Message Handler --\\
client.on('message', message => {

//-- Error Embed --\\
function eEmb(eCode) {
    var embed = new Discord.RichEmbed()
    .setColor(0x7732CA)
    .setTitle("Moji Error!")
    .addField('Output:', `\`\`\`js\n${eCode}\`\`\``)
    .setFooter(Date())
    message.channel.send(embed)
}


//-- Language Accesser --\\
function getTerm(term) {
    return languages[guilds[message.guild.id].language].terms[term];
}

    const prefix = "m!";

    if(message.author.bot)return;
    if(!users[message.author.id]) users[message.author.id] = {
        tag: message.author.tag,
        coins: 0,
        customJob: false,
        jobInfo: {
            jobID: "0",
            isOwner: false,
            lastWorkDate: ""
        },
        wins: 0
    }
    users[message.author.id].coins++;
    write(1);

    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix) || message.channel.type == 'dm')return;

    try {
        delete require.cache[require.resolve(`./Commands/${cmd}.js`)]

        let cmdFile = require(`./Commands/${cmd}.js`)
        cmdFile.run(client, message, args, eEmb, users, jobs, write, guilds, languages, getTerm); //-- Required to use all
    }
    catch(e) {
       message.channel.send(`Sorry, ${message.author}, "I could not run command '**${cmd}**'`);
    }
})