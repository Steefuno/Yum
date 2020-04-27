const Discord = require('discord.js');
const client = new Discord.Client();
const bot_data = require("./bot_data");
const command_module = require("./command_module");

const handleMessage = function(message) {
  // Ignore list
  console.log(message.content);
  if (message.author.bot) return;
  
  // Check if message is a command
  var message_data = command_module.get_command(message.content);
  if (message_data == null) return;
  
  var command_data = message_data[1].match(/(\S*)\s*(.*)/i);
  if (command_data == null) {
    return message.reply("can you repeat that? I didn't read that correctly.");
  }
  
  // Check if user has access
  if (false) {
    return message.reply("no");
  }
  
  // Run command
  var func = command_module.commands[command_data[1].toLowerCase()]
  if (func) {
    return func(message, command_data[2]);
  } else {
    return message.reply("haha, I can't do that.");
  }
};

client.on('message', handleMessage);
client.login(bot_data.token);