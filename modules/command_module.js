const dbmodule = require("./dbmodule");
const Discord = require('discord.js');
const fs = require("fs")

var prefix = "yum!";

// get command after prefix and all args afterwards
const get_command = function(str) {
  var patt = new RegExp(prefix + "\s?(.*)\s?(.*)", "i");
  var result = patt.exec(str);
  console.log(result);
  return result;
};
exports.get_command = get_command;

// get arguments from command_content separated by spaces
const get_args = function(command_content) {
  var patt = new RegExp()
}

// output error if exists
const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}


/* Commands */
var commands = {};


// displays list of commands
const help = function(message, command_content) {
  var description = "The prefix is currently " + prefix;
  
  
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Menu")
    .setDescription(`
      The prefix is currently "${prefix}"
      **${prefix} help** - shows you this help menu
      **${prefix} ping** - pong
      **${prefix} get NAME** - shows you the text for the name
      **${prefix} set NAME MESSAGE** - sets a text for a name
      **${prefix} remove NAME** - removes a text for a name
      **${prefix} say CHANNELMENTION TITLE MESSAGE** - sends a message in mentioned channel
    `)
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(9821183)
  ;
  
  return message.channel.send("", embed, output_error);
}
commands["help"] = help;

exports.commands = commands;