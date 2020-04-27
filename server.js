const Discord = require('discord.js');
const client = new Discord.Client();
const bot_data = require("./bot_data");
const command_module = require("./command_module");

const handleMessage = function(message) {
  // Check if message is a command
  var message_data = command_module.get_command(message.content);
  if (message_data == null) return;
  
  console.log(message.content);
  
  var command_data = message_data[1].match(/(\S*)\s*(.*)/i);
  console.log(command_data);
  if (command_data == null) {
    return message.reply("Invalid command");
  }
  
  // Check if user has access
  if (false) {
    return message.reply("no");
  }
  
  // Run command
  return command_module.commands[command_data[1].toLowerCase()](message, command_data[2]);
};

client.on('message', message => handleMessage);

client.login(bot_data.token);