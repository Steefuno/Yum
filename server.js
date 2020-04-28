const http = require('http');
const express = require('express');
const app = express();

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
  
  var command_data = message_data[1].match(/(\S*)\s*(.*)/im);
  if (command_data == null) {
    return message.reply("can you repeat that? I didn't read that correctly.");
  }
  console.log(command_data);
  
  // Get command function
  var func = command_module.commands[command_data[1].toLowerCase()]
  if (func == null) {
    console.log(command_data[1]);
    return message.reply("haha, I can't do that.");
  }
    
  // Run Command
  return func(message, command_data[2]);
};

client.on("message", handleMessage);
client.on("ready", () => {
  console.log("Joined the fray.");
});
client.login(bot_data.token, (err) => {
  console.error(err);
});


/* Keep alive */
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);