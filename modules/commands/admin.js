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

// Sends an embed message of commands for admins
const show_admin_help = function(message) {
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

// displays list of commands
exports.func = function(message, command_content) {
  // check usage permission
  
  
  var patt = /(\S+)\s?/g;
  var argument_data = [...command_content[2].matchAll(patt)];
  console.log(argument_data);
  
  if (argument_data.length == 0) {
    return show_admin_help(message);
  } else if (argument_data[0] == ) {
    
  }
}

exports.aliases = [
  "admin",
  "hacks",
];