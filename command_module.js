const dbmodule = require("./dbmodule");

var prefix = "hey steve";

// get text after prefix
const get_command = function(str) {
  var result = str.match(prefix + "(.*)", "i");
  if (result == null) return null;
  
  return result[1].match(/\s*(.*)/i);
};
exports.get_command = get_command;

// output error in console
const


/* Commands */
var commands = {};

// ping command
const ping = function(message, command_content) {
  //command_content ignore
  return message.channel.send("pong");
}
commands["ping"] = ping;

// what's command
const whats = function(message, command_content) {
  //command_content = info id
  return dbmodule.get_info(command_content, (err, row) => {
    if (err) {
      return message.channel.send
    }
  });
}

exports.commands = commands;