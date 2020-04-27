var prefix = "hey steve";

// get text after prefix
const get_command = function(message) {
  return message.match(prefix + "(.*)", "i");
};

var commands = {};

// ping command
const ping = function(speaker) {
  
}