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
  
  // if manage message perm
  var author_permissions = message.member.permissionsIn(message.channel.id);
  if (author_permissions.bitfield & 0x00002000 != 0) { // Manage Messages Permission
    // output all tuple ids
    dbmodule.get_all((err, rows) => {
      if (err) {
        message.reply("ping failed: " + err, output_error);
        return console.error(err);
      }

      console.log("Getting all rows:");
      rows.forEach((row) => {
        console.log("\t", row.id, "\t", row.text);
      });
    });
  }
  
  return message.reply("pong", output_error);
}
commands["ping"] = ping;
commands["boop"] = ping;


// get text using an id from database
const get_info = function(message, command_content) {
  // command_content = "info id"
  var args = get_args(command_content);
  if (args.length != 1) {
    return message.reply("your message is a bit weird, please refer to the help command.", output_error);
  }
  
  console.log(args);
  return dbmodule.get_info(args[0].toLowerCase(), (err, row) => {
    if (err) {
      return message.reply("get_info failed: " + args[0], output_error);
    }
    if (row == null) {
      return message.reply("I can't get info on " + args[0]);
    }
    return message.reply(row.text, output_error);
  });
}
commands["what's"] = get_info;
commands["whats"] = get_info;
commands["get"] = get_info;


// add text to database
const add_info = function(message, command_content) {
  // command_content = '"info" "id"'
  var args = get_args(command_content);
  if (args.length != 2) {
    return message.reply("your message is a bit weird, please refer to the help command.", output_error);
  }
  
  // Get if user has access
  var author_permissions = message.member.permissionsIn(message.channel.id);
  if (author_permissions.bitfield & 0x00002000 == 0) { // Manage Messages Permission
    return message.reply("haha, you can't do that.");
  }
  
  dbmodule.add_info(args[0].toLowerCase(), args[1], (err) => {
    if (err) {
      message.reply("add_info failed: " + err, output_error);
      return console.error(err);
    }
    return message.reply("I added " + args[0] + " successfully.", output_error);
  });
}
commands["add"] = add_info;
commands["set"] = add_info;


// remove text from database
const remove_info = function(message, command_content) {
  // command_content = "id"
  var args = get_args(command_content);
  if (args.length != 1) {
    return message.reply("your message is a bit weird, please refer to the help command.", output_error);
  }
  
  // Get if user has access
  var author_permissions = message.member.permissionsIn(message.channel.id);
  if (author_permissions.bitfield & 0x00002000 == 0) { // Manage Messages Permission
    return message.reply("haha, you can't do that.");
  }
  
  dbmodule.remove_info(args[0].toLowerCase(), (err) => {
    if (err) {
      message.reply("remove_info failed: " + err, output_error);
      return console.error(err);
    }
    return message.reply("I removed " + args[0] + " successfully.", output_error);
  });
}
commands["remove"] = remove_info;
commands["delete"] = remove_info;


// Say an embeded message in a channel
const say_in = function(message, command_content) {
  // command_content = "<#channel mention>  message"
  var command_data = command_content.match(/[^>]*>\s*(.*)/);
  if (command_data == null) {
    return message.reply("your message is a bit weird, please refer to the help command.", output_error);
  }
  var text = command_data[1];
  
  var mentioned_channel = message.mentions.channels.first();
  if (mentioned_channel == null) {
    return message.reply("your message is a bit weird, please refer to the help command.", output_error);
  }
  
  console.log("Attempting to say in", mentioned_channel.name, "\t", text);
  
  // Get if user has access
  var author_permissions = message.member.permissionsIn(message.channel.id);
  if (author_permissions.bitfield & 0x00002000 == 0) { // Manage Messages Permission
    return message.reply("haha, you can't do that.", output_error);
  }
  
  
}
commands["say"] = say_in;
commands["announce"] = say_in;

exports.commands = commands;