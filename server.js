const Discord = require('discord.js');
const client = new Discord.Client();
const dbmodule = require("./dbmodule");
const bot_data = require("./bot_data");
const command_module = require("./command_module");


const handleMessage = function(message) {
  // Check if message is a command
  var message_data = command_module.get_command(message.content);
  if (message_data == null) return;
  
  var command = 
  
  // Check if user has access
  
  
  // Run command
  
};

client.on('message', message => handleMessage);

client.login(bot_data.token);