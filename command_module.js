const dbmodule = require("./dbmodule");

var prefix = "hey steve";

// get text after prefix
const get_command = function(str) {
  var result = str.match(prefix + "(.*)", "i");
  if (result == null) return null;
  
  return result[1].match(/\s*(.*)/i);
};
exports.get_command = get_command;

// get arguments from command content
const get_quoted_args = function(command_content) {
  return [...command_content.matchAll(/(?:"([^"]*)"\s*)/g)];
}
const get_args = function(command_content) {
  // get args separated by quotes
  var args = get_quoted_args(command_content);
  
  // if args by quotes DNE, get separated by space
  if (args.length == 0) {
    return command_content.split(" ");
  } else {
    var result = [];
    var i;
    for (i=0; i < args.length; i++) {
      result.push(args[i][1]);
    }
    return result;
  }
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

// ping command
const ping = function(message, command_content) {
  // command_content ignore
  var args = get_args(command_content);
  
  return message.channel.send("pong", output_error);
}
commands["ping"] = ping;

// what's command
const whats = function(message, command_content) {
  // command_content = "info id"
  var args = get_args(command_content);
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
  var args = get_args(command_content);
  if (args.length != 2) {
    return message.channel.send("Invalid arguments, please refer to the help command", output_error);
  }
  console.log(args[0], "\t", args[1]);
  dbmodule.add_info(args[0], args[1], (err) => {
    if (err) {
      message.channel.send("add_info failed: " + err, output_error);
      return console.error(err);
    }
    return message.author.reply("added info on " + args[0]);
  });
}
commands["add_info"] = add_info;

exports.commands = commands;