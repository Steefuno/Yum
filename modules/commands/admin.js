const Discord = require("discord.js");
const bot_data = require("./../bot_data");
const dbmodule = require("./../dbmodule");

const modules = [
  "help",
  "run",
  "get",
  "all",
  "set_bal"
];

const prefix = bot_data.prefix;

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

const is_admin = function(user) {
  var i;
  for (i=0; i<bot_data.admins.length; i++) {
    if (bot_data.admins[i] == user.id) {
      return true;
    }
  }
  return false;
}

var commands = [];

// Loop through all command modules
modules.forEach(function(command) {
  var command_data = require("./modules/admin/" + command);
  commands[command] = command_data.func;
});


// displays list of commands
exports.func = function(message, command_content) {
  // check usage permission
  if (!is_admin(message.author)) return;
  
  // run help function on no admin command
  if (command_content[2].length == 0) {
    return show_admin_help(message);
  }
  
  var patt = /(\S+)\s?(.*)/;
  command_content = command_content[2].match(patt);
  
  // if invalid
  if (command_content == null) {
    return console.error("Invalid admin command.");
  }
  
  // find and run admin command
  var func = commands[command_content[1].toLowerCase()];
  if (func != null) {
    return func(message, command_content[2]);
  }
  
  // help on invalid command
  return commands.help(message, command_content[2]);
}

exports.aliases = [
  "admin"
];