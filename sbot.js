const Discord = require('discord.js');
const sbot = new Discord.Client({ disableEveryone: true });
const chalk = require('chalk');

var cfg = {
    ID: "ID HERE", //ID of owner
    token: "TOKEN HERE", //token
    logs: "ID HERE" //log channel ID
}

sbot.on("ready", () => {
    console.log(chalk.greenBright(`-[READY]-[${sbot.user.username}]-[${new Date()}]`) + chalk.yellowBright(`\nOWNER ID: ${cfg.ID}\nLOG CHANNEL ID: ${cfg.logs}\nTOKEN: ${cfg.token}\n`) + chalk.greenBright("---------"))
})

sbot.on("message", (message) => {
    if(message.author.id != cfg.ID) return;
    if(message.channel.type === "dm") return;
    const prefix = "<>";
    if(message.content == 'some words'){
        message.channel.startTyping();
        setTimeout(() => {
            message.channel.send(`some word for answer`)
        }, 2000)
        message.channel.stopTyping;
    };
})

sbot.on("messageDelete", (message) => {
    if(message.author.bot) return;
    const log = new Discord.RichEmbed()
    .setTitle('Message Deleted | ' + message.author.tag)
    .setDescription(message.content)
    .setColor('ff6600')
    .setThumbnail(message.author.displayAvatarURL)
    sbot.channels.get(cfg.logs).send(log)
});

sbot.login(cfg.token);
