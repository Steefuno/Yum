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

var commands = [];

// Sends an embed message of commands for admins
const show_admin_help = function(message, args) {
  var embed = new Discord.MessageEmbed()
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
    .setTitle("Admin Menu")
    .setDescription(`
      The prefix is currently "${prefix} admin"
      **${prefix}admin** - opens this help menu
      **${prefix}admin run INSTRUCTION** - run a database instruction
      **${prefix}admin get INSTRUCTION** - outputs a database instruction
      **${prefix}admin set_bal USERMENTION AMOUNT** - sets a users balance
    `)
  ;
  return message.channel.send("", embed, output_error);
}
commands.show_admin_help = show_admin_help;

// runs a database instruction
const db_run = function(message, args) {
  console.log(args);
  return dbmodule.run(args, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log("Successfully ran.")
  });
}
commands.run = db_run;

// outputs a database instruction
const db_get = function(message, args) {
  console.log(args);
  return dbmodule.get(args, (err, row) => {
    if (err) {
      return console.error(err);
    }
    return console.log(row);
  });
}
commands.get = db_get;

// displays list of commands
exports.func = function(message, command_content) {
  // check usage permission
  
  
  // run help function on no admin command
  if (command_content[2].length == 0) {
    return commands.show_admin_help(message);
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
  return commands.show_admin_help(message, command_content[2]);
}

exports.aliases = [
  "admin",
  "hacks",
];