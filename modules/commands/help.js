const Discord = require("discord.js");
const bot_data = require("./../bot_data");

const prefix = bot_data.prefix;

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

// displays list of commands
exports.func = function(message, command_content) {
  var description = "The prefix is currently " + prefix;
  
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Menu")
    .setDescription(`
      The prefix is currently "${prefix}"
      **${prefix} help** - opens this help menu
      **${prefix} bal** - displays how much money you have
    `)
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "help"
];