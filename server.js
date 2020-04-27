const Discord = require('discord.js');
const client = new Discord.Client();
const dbmodule = require("./dbmodule");
const bot_data = require("./bot_data");

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(bot_data.token);