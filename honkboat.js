const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const moment = require("moment");
require("moment-duration-format")
const { token, name, prefix } = require("./Plugins/config.json");
const colors = require("./Plugins/colors.json");

client.on('ready', () => {

    console.log(` [ GATEWAY - BOT ]: ${name}: online | PID: ${process.pid}`)
    client.user.setActivity(`HJONK AM GOOSE!`, { type: 'LISTENING' })
});

client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/);
    var command = args.shift().toLowerCase();

    var footer = `HJONK AM GOOSE!`;
    var title = `HJONK AM GOOSE!`;
    var reportChannel = `787379695624126484`;
    var error = `<:redboxXmark:827612356673667114>`;
    var success = `<:greenboxVmark:827612356716396594>`;
    var info = `<:nooder_info:728307928234328135>`;

    if (command === 'help') {

        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command help in ${message.guild.name}`);

        var help = new Discord.MessageEmbed()
            .setAuthor(`HonkBoat's Plugins`, message.author.displayAvatarURL())
            .addField(`Commands [ 7 ]`, "`honk, invite, uptime, stats, support`")
            .setColor(colors.PURPLE)
            .setFooter(footer)
        message.channel.send(help)
    }

    if (command === 'honk') {

        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command honk in ${message.guild.name}`);

        var honkapi = await fetch("https://api.nooder.gg/goose.php").then(response => response.text());

        var hjonk = new Discord.MessageEmbed()
            .setAuthor(title, message.author.displayAvatarURL())
            .setImage(honkapi)
            .setColor(colors.PURPLE)
            .setFooter(footer)
        message.channel.send(hjonk)
    }

    if (command === 'reportbug') {
        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command reportbug in ${message.guild.name}`);

        var rewards = ["??", "??", "??"]
        var rewardRandom = Math.floor((Math.random() * rewards.length))

        var invalidargs = new Discord.MessageEmbed()
            .setDescription(`${error} you need to provide arguments if you want to report a bug!`)
            .setFooter(`${prefix}reportbug bug <info>`)
            .setColor(colors.RED)

        if (!args[0]) return message.channel.send(invalidargs)

        let todayDate = moment().format('LLLL')

        var bugreport = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} Found a bug!`, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setColor(colors.RED)
            .addField("Username:", message.author.tag, true)
            .addField("User ID:", message.author.id, true)
            .addField("Report:", args.join(" "))
            .addField("Server:", message.guild.name, true)
            .setFooter(todayDate)
        client.channels.cache.filter(c => c.id === `${reportChannel}`).map(channel => channel.send(bugreport))

        var reportsent = new Discord.MessageEmbed()
            .setDescription(`${success} **_${message.author.username} reported a bug, here's a free ${rewards[rewardRandom]}_**`)
            .setColor(colors.GREEN)
        message.channel.send(reportsent)
    }

    if (command === 'invite') {
        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command invite in ${message.guild.name}`);

        var invite = new Discord.MessageEmbed()
            .setAuthor(`${name}'s Invite`, message.author.displayAvatarURL())
            .setDescription(`${success} I have fetched my [invite](https://discord.com/oauth2/authorize?client_id=705324559062007890&permissions=379904&scope=bot) for you!`)
            .setColor(colors.PURPLE)
        message.channel.send(invite)
    }

    if (command === 'stats') {
        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command stats in ${message.guild.name}`);

        var stats = new Discord.MessageEmbed()
            .setDescription(`${success} _**I'm currently in ${client.guilds.cache.size} servers!**_`)
        message.channel.send(stats)
    }

    if (command === 'uptime') {

        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command uptime in ${message.guild.name}`)

        const duration = moment.duration(client.uptime).format("Y [years] D [days], H [hours], m [minutes], s [seconds]")

        let todayDate = moment().format('LLLL')

        var uptime = new Discord.MessageEmbed()
            .setAuthor(`${name}'s Uptime`, message.author.displayAvatarURL())
            .setDescription(duration)
            .setColor(colors.PURPLE)
            .setFooter(`Last Checked: ${todayDate}`)
        message.channel.send(uptime)
    }

    if (command === 'vote') {
        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command vote in ${message.guild.name}`)

        var vote = new Discord.MessageEmbed()
            .setDescription(`${info} Vote for me on [Discord.Boats](https://discord.boats/bot/705324559062007890/vote)`)
            .setColor(colors.PURPLE)
        message.channel.send(vote)
    }

    if (command === 'sudo') {
        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command sudo in ${message.guild.name}`)
        message.delete();

        let developer = `622890595614195722`;

        if (!developer.includes(message.author.id)) {

        }
        if (developer.includes(message.author.id)) {
            var content = args.join(" ")
            message.channel.send(content, { disableEveryone: true }).catch(console.error);
        }
    }

    if (command === 'support') {
        console.log(` [ GATEKEEPER - COMMAND USED ]: ${message.author.tag} used the command support in ${message.guild.name}`)

        var support = new Discord.MessageEmbed()
            .setDescription(`${info} Support Server: [Click Me!](https://discord.gg/y8XCYDVYjj)`)
	    .setColor("GREEN");
	message.channel.send(support)
    }

});

client.login(token)
