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
  dbmodule.get_balance(message.author.id, (err, row) => {
    if (err) {
      return console.error(err);
    }
    
    var embed = new Discord.MessageEmbed()
      .setTitle("Monies")
      .setFooter(message.author.username + "#" + message.author.discriminator)
      .setColor(6611350)
    ;
    
    // credit to elise naming monies as "epic gamer coins"
    if (row) {
      embed = embed.setDescription("You have " + row.balance + " " + bot_data.currency); 
    } else {
      embed = embed.setDescription("You have 0 " + bot_data.currency);
    }
    return message.channel.send("", embed, output_error);
  });
}

exports.help = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Balance")
    .setDescription("This is the command to see how much money you have.")
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