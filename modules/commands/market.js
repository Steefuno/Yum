const Discord = require("discord.js");
const bot_data = require("./../bot_data");
const command_module = require("./../command_module.js");
const seed_random = require("seedrandom.js");

const prefix = bot_data.prefix;
const commands = [
  "view",
  "buy",
  "sell"
];

var current_seed = Date.now() / 1000 / 60 / 60 / 24; // Code changes every 24 hours
var rng = new Math.randomseed(current_seed);

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

const display_commands = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Market")
    .setDescription("\
      " + prefix + " market view - displays today's catalog\n\
      " + prefix + " market buy ID AMOUNT - buys AMOUNT market items\n\
      " + prefix + " market sell ID AMOUNT - sells AMOUNT items to the market\
    ")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;

  return message.channel.send("", embed, output_error);
}

const get_catalog = function() {
  var new_seed = Date.now() / 1000 / 60 / 60 / 24;
  if (new_seed != current_seed) {
    current_seed = new_seed;
    rng = new Math.randomseed(current_seed);
  }
  
  var catalog = {
    
  }
}
exports.get_catalog = get_catalog;

exports.func = function(message, command_content) {
  if (command_content[2].length == 0) {
    return display_commands(message, command_content);
  } else {
    var command = command_module.commands[command_content[2]];
    if (command == null) {
      return message.reply("dude, you can't get help for something that doesn't exist. Use the help command for more info.", output_error);
    }
    return command.help(message, command_content);
  }
}

exports.help = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Balance")
    .setDescription("This is the module to access the market commands.")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "shop",
  "market",
  "supermarket",
  "store"
];