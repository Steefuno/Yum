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
  if (command_content[2].length == 0) {
    var embed = new Discord.MessageEmbed()
      .setTitle("Help Menu")
      .setDescription("\
        The prefix is currently **" + prefix + "**\n\
        " + prefix + " SOME_COMMAND - gives more info on a command\n\
        " + prefix + " help - opens this help menu\n\
        " + prefix + " bal - displays how much money you have\n\
        " + prefix + " credits - shows anyone that helped with the game\
      ")
      .setFooter(message.author.username + "#" + message.author.discriminator)
      .setColor(6611350)
    ;

    return message.channel.send("", embed, output_error);
  } else {
    
  }
}

exports.help = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Help")
    .setDescription("This is the command to open the help menu, there's not much to say about this.")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "help",
  "poop"
];