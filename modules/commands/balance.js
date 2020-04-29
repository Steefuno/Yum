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

// displays list of commands
exports.func = function(message, command_content) {
  var description = "The prefix is currently " + prefix;
  
  var embed = new Discord.MessageEmbed()
    .setTitle("Monies")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  dbmodule.get_balance(message.author.id, (err, row) => {
    if (err) {
      return console.error(err);
    }
    
    // credit to elise naming monies as "epic gamer coins"
    if (row) {
      embed = embed.setDescription("You have " + row.balance + " " + bot_data.currency); 
    } else {
      embed = embed.setDescription("You have 0 " + bot_data.currency);
    }
    return message.channel.send("", embed, output_error);
  });
}

exports.aliases = [
  "balance",
  "bal",
  "money"
];