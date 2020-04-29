const Discord = require("discord.js");
const bot_data = require("./../bot_data");
const command_module = require("./../command_module.js");

const prefix = bot_data.prefix;

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

exports.func = function(message, command_content) {
  if (command_content[2].length == 0) {
    var embed = new Discord.MessageEmbed()
      .setTitle("Help Balance")
      .setDescription("This is the module to access the market functions.")
      .setFooter(message.author.username + "#" + message.author.discriminator)
      .setColor(6611350)
    ;

    return message.channel.send("", embed, output_error);
  } else {
    
  }
}

exports.help = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Balance")
    .setDescription("This is the module to access the market functions.")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "balance",
  "bal",
  "money",
  "monies"
];