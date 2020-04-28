const Discord = require('discord.js');
const client = new Discord.Client();
const bot_data = require("./bot_data");
const command_module = require("./modules/command_module");
const keep_alive = require("./modules/keep_alive");

const handleMessage = function(message) {
  // Ignore bot messages
  if (message.author.bot) return;
  
  // Check if message is in command format
  var command_data = command_module.get_command(message.content);
  if (command_data != null) {
    // Handle a command
    // Get command eg. help
    var command = command_data[1];

    // Get command function eg. help()
    var func = command_module.commands[command_data[1].toLowerCase()]
    if (func == null) {
      return message.reply("haha, I can't do that. Use the help command for more info.");
    }

    // Run Command
    return func(message, command_data[2]);
  } else {
    // Check if bot has been mentioned
    var mention = message.mentions.users.first();
    if (mention && mention.equals(client.user)) {
      // Handle the ping by calling help function
      return command_module.commands["help"](message, null);
    }
  }
};

client.on("message", handleMessage);
client.on("ready", () => {
  console.log("Joined the fray.");
});
client.login(bot_data.token, (err) => {
  console.error(err);
});