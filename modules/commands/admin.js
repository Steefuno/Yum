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
const show_admin_help = function(message, argument_data) {
  var embed = new Discord.MessageEmbed()
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
    .setTitle("Admin Menu")
    .setDescription(`
      The prefix is currently "${prefix} admin"
      **${prefix}admin** - opens this help menu
      **${prefix}admin run INSTRUCTION ARG1 ARG2 ...** - run a database instruction
      **${prefix}admin get INSTRUCTION ARG1 ARG2 ...** - output a database instruction
      **${prefix}admin set_bal USERMENTION AMOUNT** - sets a users balance
    `)
  ;
  return message.channel.send("", embed, output_error);
}
commands.show_admin_help = show_admin_help;

// runs a database instruction
const db_run = function(message, argument_data) {
  
}

// displays list of commands
exports.func = function(message, command_content) {
  // check usage permission
  
  
  // run help function on no admin command
  if (command_content[2].length == 0) {
    return commands.show_admin_help(message);
  }
  
  var patt = /(\S+)\s?(.*)/g;
  var argument_data = command_content[2].match(patt);
  console.log(argument_data);
  
  // if 
  if (argument_data == null) {
    
  }
  
  // find and run admin command
  var func = commands[argument_data[0][1].toLowerCase()];
  if (func != null) {
    return func(message, argument_data);
  }
  
  return commands.show_admin_help(message, argument_data);
}

exports.aliases = [
  "admin",
  "hacks",
];