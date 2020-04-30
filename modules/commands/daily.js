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

// checks if user is able to claim daily, then grands credits
exports.func = function(message, command_content) {
  return dbmodule.get_daily(message.author.id, (err, row) => {
    if (err) {
      console.error("Cannot get daily time of " + message.author.id + ".", output_error);
      console.error(err);
      return message.reply("oop, Houston, we have a problem.", output_error);
    }
    
    var current = Math.floor(Date.now()/1000/60);
    // if unavailable
    if (row != null && current - row.daily < 24*60*60*1000) {
      var time_left = current - row.daily;
      return message.reply("you need to wait " +  + " hours.");
    }
  });
};

exports.help = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Daily")
    .setDescription("Use this once per day for some " + bot_data.currency + ".")
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