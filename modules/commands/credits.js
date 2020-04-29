const Discord = require("discord.js");
const bot_data = require("./../bot_data");
const dbmodule = require("./../dbmodule");

const prefix = bot_data.prefix;

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

// displays caller's balance
exports.func = function(message, command_content) {
  var description = "The prefix is currently " + prefix;
  
  var embed = new Discord.MessageEmbed()
    .setTitle("End Credits")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
    .setDescription("\
      Good job, you beat the game.\n\
      Thanks to Elise for naming money the weird name \"epic gamer coins.\"\n\
      Thank you for supporting the game :)\n\
         - Steve\
    ");
  ;
  return message.channel.send("", embed, output_error);
}

exports.help = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Credits")
    .setDescription("This is the command to open the credits and list whomever helped developed this project.")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "credits",
  "thanks"
];