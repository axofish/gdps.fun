const Discord = require('discord.js');
const bot = new Discord.Client();
let prefix = '$';
let commands = require('./commands.js');















bot.on('message', async(msg) => {
    let cmd;
    let message = msg.content;
    let args = message.split(" ");
    args.shift();
    if (message.startsWith(prefix)) {
        cmd = message.split(" ")[0].split("$")[1];
        let success = false;
        commands.forEach(async command => {
            if (command.name == cmd) {
                if (command.admin) {
                    let gdpsFunTeamRole = msg.guild.roles.cache.find(role => role.name === "GDPS.FUN Team");
                    if (msg.member._roles.indexOf(gdpsFunTeamRole.id) == -1) {
                        msg.channel.send("У вас недостаточно прав для выполнения этой команды!");
                        success = true;
                        return;
                    }
                }
                let cmdSuccess = command.function(msg, args);
                console.log(msg.author.tag + " used command $" + cmd);
                success = true;
                if (cmdSuccess == true) {
                    msg.react('✅');
                } else if (cmdSuccess == false) {
                    msg.react('❌');
                }
            }
        });
        if (!success) {
            console.log(msg.author.tag + " used unknown command $" + cmd);
        }
    }
});













bot.on('ready', () => {
    bot.user.setPresence({ activity: { name: '$help | gdps.fun' }, status: null, })
    console.log("Ready");
});

bot.login("OTQ3MDY2MjM3MjExNTE2OTU5.Yhn2Kg.3XoNl_g-dXXXR5e6V6PYmiuCN1c");