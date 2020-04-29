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
    .setDescription(`
      Good job, you beat the game.\n
      Thanks to Elise for giving money the weird name "epic gamer coins."
      Thank you for supporting the game :)
      - Steve
    `);
  ;
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "credits",
  "thanks"
];