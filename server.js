const Discord = require('discord.js');
const client = new Discord.Client();
const dbmodule = require("./dbmodule");

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.login("");