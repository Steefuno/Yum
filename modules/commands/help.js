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

const display_commands = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Menu")
    .setDescription("\
      The prefix is currently **" + prefix + "**\n\
      " + prefix + " SOME_COMMAND - gives more info on a command\n\
      " + prefix + " help - opens this help menu\n\
      " + prefix + " bal - displays how much money you have\n\
      " + prefix + " market - displays market commands\n\
      " + prefix + " credits - shows anyone that helped with the game\
    ")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;

  return message.channel.send("", embed, output_error);
}

// displays list of commands or info on a command
exports.func = function(message, command_content) {
  if (command_content[2].length == 0) {
    return display_commands(message, command_content);
  } else {
    var command = command_module.commands[command_content[2]];
    if (command == null) {
      return message.reply("dude, you can't get help for something that doesn't exist. Use the help command for more info.", output_error);
    }
    return command.help(message, command_content);
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
  "huh"
];