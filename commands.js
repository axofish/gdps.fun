const Discord = require('discord.js');
const mathjs = require('mathjs');
const request = require('request');
const reply = require('./extmessage.js');

module.exports = [{
        name: "info",
        function: (msg) => {
            let embed = new Discord.MessageEmbed()
                .setTitle("**GDPS.FUN Bot | By Axolotl**")
                .setColor("#90ffff")
                .setDescription("Help - $help")
                .setFooter("v0 (indev)")
            msg.inlineReply(embed);
        }
    },
    {
        name: "help",
        function: (msg) => {
            let embed = new Discord.MessageEmbed()
                .setTitle("**Доступные команды**")
                .setColor("#90ffff")
                .addField("Инфо", "$help - Показать этот список\n$info - Информация о боте", true)
                .addField("Основное", "$sban - посадить в обезьянник\n$unsban - выпустить из обезьянника", true)
                .addField("Игрушки", "$calc - вычислить результат математического выражения (еще не готово)")
                //.addField("Инструменты", "**Скоро...**", true)
                .setFooter("v0 (indev)")
            msg.inlineReply(embed);
        }
    },
    {
        admin: true,
        name: "sban",
        function: (msg) => {
            try {
                let member = msg.mentions.members.first();
                if (!member || !member.guild) {
                    msg.inlineReply("Ошибка");
                    return false;
                };
                msg.guild.roles.fetch('944979175532556309')
                    .then((role) => {
                        member.roles.add(role);
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Готово")
                            .setColor("#90ffff")
                            .setDescription("**" + member.user.username + "** посажен в обезьянник!\nВыпустить - `$unsban @" + member.user.tag + "`")
                            .setFooter("GDPS.FUN Bot V0 (indev)");
                        msg.inlineReply(embed);
                        return true;
                    });
            } catch (e) {
                console.log(e.message);
                msg.inlineReply("При выполнении команды произошла ошибка:\n`" + e.message + "`");
                return false;
            }
        }
    },
    {
        admin: true,
        name: "unsban",
        function: (msg) => {
            try {
                let member = msg.mentions.members.first();
                if (!member || !member.guild) {
                    msg.inlineReply("Ошибка");
                    return false;
                }
                msg.guild.roles.fetch('944979175532556309')
                    .then((role) => {
                        member.roles.remove(role);
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Готово")
                            .setColor("#90ffff")
                            .setDescription(member.user.username + " выпущен из обезьянника!")
                            .setFooter("GDPS.FUN Bot V0 (indev)");
                        msg.inlineReply(embed);
                        return true;
                    });
            } catch (e) {
                console.log(e.message);
                msg.inlineReply("При выполнении команды произошла ошибка:\n`" + e.message + "`");
                return false;
            }
        }
    },
    {
        name: "calc",
        function: (msg, args) => {
            if (args.length == 1) {
                try {
                    let query = args[0].replaceAll(" ", "");
                    let result = mathjs.evaluate(query);
                    msg.inlineReply("Результат: " + result);
                    return true;
                } catch (e) {
                    msg.inlineReply("Введите математическое выражение!");
                    console.log("Math error: " + e.message);
                    return false;
                }
            }
        }
    },
    {
        name: "req",
        function: (msg, args) => {
            if (args.length == 1) {
                request.get(args[0], (e, res) => {
                    if (e) {
                        msg.inlineReply("Ошибка запроса: " + e.message);
                        return false;
                    } else {
                        msg.inlineReply("Статус: " + res.statusCode + " " + res.statusMessage);
                        return true;
                    }
                });
            }
        }
    },
    {
        name: 'show',
        function: (msg) => {
            msg.inlineReply(new Discord.MessageEmbed({ title: 'kirker dayn', description: "[google](https://google.com)" }));
        }
    }
]