const dbmodule = require("./dbmodule");

var prefix = "hey steve";

// get text after prefix
const get_command = function(str) {
  var result = str.match(prefix + "(.*)", "i");
  if (result == null) return null;
  
  return result[1].match(/\s*(.*)/i);
};
exports.get_command = get_command;

// output error if exists
const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}


/* Commands */
var commands = {};

// ping command
const ping = function(message, command_content) {
  // command_content ignore
  return message.channel.send("pong", output_error);
}
commands["ping"] = ping;

// what's command
const whats = function(message, command_content) {
  // command_content = info id
  return dbmodule.get_info(command_content, (err, row) => {
    if (err) {
      return message.channel.send("cannot get info: " + command_content, output_error);
    }
    return message.channel.send(row.text, output_error);
  });
}
commands["whats"] = whats;

// add text to database
const add_info = function(message, command_content) {
  // command_content[0] = row id
  // command_content[1] = row text
  var args = command_content.match("(\S*)\s*(.*)");
  return dbmodule.add_info(args[1], args[2], output_error);
}
commands["add_info"] = add_info;

exports.commands = commands;