const dbmodule = require("./dbmodule");

var prefix = "hey steve";

// get text after prefix
const get_command = function(str) {
  var result = str.match(prefix + "(.*)", "i");
  if (result == null) return null;
  
  return result[1].match(/\s*(.*)/i);
};

var commands = {};

// ping command
const ping = function(message, command_content) {
  message.reply("pong");
}
commands["ping"] = ping;