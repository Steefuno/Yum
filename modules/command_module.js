const dbmodule = require("./dbmodule");
const Discord = require("discord.js")
const bot_data = require("./bot_data");
const fs = require("fs")

var prefix = bot_data.prefix;

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
  var patt = /(\S*)\s?/g;
  var matches = command_content.matchAll(patt);
  
  var result = [];
  var i;
  for (i=0; i<result.length; i++) {
    result.push(matches[i][1])
  }
  return result;
}


/* Commands */
exports.commands = {};
const commands = [
  "help"
];

commands.forEach(function(command) {
  exports.commands[command] = require("./commands/" + command).func;
});