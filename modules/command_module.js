const dbmodule = require("./dbmodule");
const Discord = require("discord.js")
const bot_data = require("./bot_data");
const fs = require("fs")

var prefix = bot_data.prefix;

const modules = [
  "help",
  "balance",
  "admin",
  "credits",
  "market",
  "inventory"
];
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
    "\t>",
    message.author.username + "#" + message.author.discriminator,
    message.author.id,
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
  command = exports.commands[command_data[1].toLowerCase()];
  if (command == null) {
    log_usage(message, "help", "");
    return message.reply("haha, I can't do that. Use the help command for more info.", output_error);
  }
  var func = command.func;

  // Run Command
  log_usage(message, command_data[1], command_data[2]);
  return func(message, command_data);
}


// Loop through all command modules
modules.forEach(function(filename) {
  var command_data = require("./commands/" + filename);
  
  // Loop through all keywords used to call command
  command_data.aliases.forEach(function(alias) {
    exports.commands[alias] = command_data;
  });
});