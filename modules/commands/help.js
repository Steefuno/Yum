const bot_data = require("./../../bot_data");
const Discord = require("discord.js");

const prefix = bot_data.prefix;

// displays list of commands
const help = function(message, command_content) {
  var description = "The prefix is currently " + prefix;
  
  
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Menu")
    .setDescription(`
      The prefix is currently "${prefix}"
      **${prefix} help** - shows you this help menu
      **${prefix} ping** - pong
      **${prefix} get NAME** - shows you the text for the name
      **${prefix} set NAME MESSAGE** - sets a text for a name
      **${prefix} remove NAME** - removes a text for a name
      **${prefix} say CHANNELMENTION TITLE MESSAGE** - sends a message in mentioned channel
    `)
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(9821183)
  ;
  
  return message.channel.send("", embed, output_error);
}