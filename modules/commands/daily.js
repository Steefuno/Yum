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
  return dbmodule.get_daily_time(message.author.id, (err, row) => {
    if (err) {
      console.error("Cannot get daily time of " + message.author.id + ".");
      console.error(err);
      return message.reply("oop, Houston, we have a problem.", output_error);
    }
    
    var current = Math.floor(Date.now()/1000/60);
    // if unavailable
    if (row != null && current - row.daily < 24) {
      var hours_left = Math.floor((24 - (current - row.daily))*10)/10;
      return message.reply("you need to wait " + hours_left + " hours.");
    }
    
    // if available
    return dbmodule.set_daily_time(message.author.id, (err) => {
      if (err) {
        console.error("Cannot set daily time of " + message.author.id + ".");
        console.error(err);
        return message.reply("there's some problem, try again later.", output_error);
      }
      
      return dbmodule.add_balance(message.author.id, bot_data.daily, (err) => {
        if (err) {
          console.error("Fatal: Cannot add daily to balance of " + message.author.id + ".");
          console.error(err);
          return message.reply("welp, major problem, you might wanna get this fixed.", output_error);
        }
        
        var embed = new Discord.MessageEmbed()
          .setTitle("Claimed Daily")
          .setDescription("Cool Cool. You claimed your daily " + bot_data.daily + " " + bot_data.currency + ".")
          .setFooter(message.author.username + "#" + message.author.discriminator)
          .setColor(6611350)
        ;

        return message.channel.send("", embed, output_error);
      });
    });
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
  "daily"
];