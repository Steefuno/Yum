const Discord = require('discord.js');
const client = new Discord.Client();
const bot_data = require("./bot_data");
const command_module = require("./command_module");

const handleMessage = function(message) {
  // Ignore bot messages
  if (message.author.bot) return;
  
  // Check if message is in command format
  var message_data = command_module.get_command(message.content);
  if (message_data == null) return;
  
  var command_data = message_data[1].match(/(\S*)\s*(.*)/i);
  if (command_data == null) {
    return message.reply("can you repeat that? I didn't read that correctly.");
  }
  
  // Get command function
  var func = command_module.commands[command_data[1].toLowerCase()]
  if (func == null) {
    return message.reply("haha, I can't do that.");
  }
    
  // Run Command
  return func(message, command_data[2]);
};

client.on("message", handleMessage);
client.on("ready", () => {
  console.log("Joined the fray.");
});
client.login(bot_data.token);