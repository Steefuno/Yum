const Discord = require('discord.js');
const client = new Discord.Client();
const dbmodule = require("./dbmodule");
const bot_data = require("./bot_data");
const command_module = require("./command_module");


const handleMessage = function(message) {
  if (command_module.commands[message]) {
      
  }
};

client.on('message', message => handleMessage);

client.login(bot_data.token);