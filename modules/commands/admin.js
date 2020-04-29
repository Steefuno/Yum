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

// displays list of commands
exports.func = function(message, command_content) {
  // check usage permission
  
  var embed = new Discord.MessageEmbed()
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  var patt = /(\S+)\s?/g;
  var argument_data = [...command_content[2].matchAll(patt)];
  console.log(argument_data);
  
  if (argument_data.length == 0) {
    embed = embed
      .setTitle("Admin Menu")
      .setDescription(`
        The prefix is currently "${prefix} admin"
        **${prefix}admin** - opens this help menu
        **${prefix}admin run INSTRUCTION ARG1 ARG2 ...** - run a database instruction
        **${prefix}admin get INSTRUCTION ARG1 ARG2 ...** - output a database instruction
        **${prefix}admin set_bal USERMENTION AMOUNT** - sets a users balance
      `)
    ;
  } else if (false) {
    
  }
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "admin",
  "hacks",
];