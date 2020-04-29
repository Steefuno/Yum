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
  // check usage permission
  
  
  var patt = /(\S*)\s(.*)/;
  var argument_data = command_content.match(patt);
  if (argument_data == null) {
    
  }
}

exports.aliases = [
  "admin",
  "hacks",
];