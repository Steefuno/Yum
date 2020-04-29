const dbmodule = require("./dbmodule");
const Discord = require("discord.js")
const bot_data = require("./bot_data");
const fs = require("fs")

var prefix = bot_data.prefix;

exports.commands = {};

// get command after prefix and all args afterwards
const get_command = function(str) {
  var patt = new RegExp(prefix + "\\s?(\\S*)\\s?(.*)", "i");
  var result = patt.exec(str);
  return result;
};
exports.get_command = get_command;

// used to log commands used and by whom
const log_usage = function(message, command, content) {
  return console.log(
    message.author.username + "#" + message.author.discriminator,
    message.author.id,
    "\t",
    command,
    "\t",
    content
  );
}

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

exports.handle_command = function(message, command_data) {
  // Get command eg. help
  var command = command_data[1];

  // Get command function eg. help()
  var func = exports.commands[command_data[1].toLowerCase()];
  if (func == null) {
    return message.reply("haha, I can't do that. Use the help command for more info.", output_error);
  }

  // Run Command
  return func(message, command_data);
}

/* Commands */
const files = [
  "help",
  "balance",
  "admin"
];

// Loop through all command modules
files.forEach(function(filename) {
  var command_data = require("./commands/" + filename);
  var command_func = command_data.func;
  
  // Loop through all keywords used to call command
  command_data.aliases.forEach(function(alias) {
    exports.commands[alias] = command_func;
  });
});