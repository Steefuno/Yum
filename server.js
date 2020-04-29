const Discord = require('discord.js');
const bot_data = require("./modules/bot_data");
const command_module = require("./modules/command_module");
const keep_alive = require("./modules/keep_alive");

const client = new Discord.Client();

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

const log_usage = function(message) {
  return console.log(
    message.author.username + "#" + message.author.discriminator,
    message.author.id, "help")
}

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
      return message.reply("haha, I can't do that. Use the help command for more info.", output_error);
    }

    // Run Command
    return func(message, command_data[2]);
  } else {
    // Check if bot has been mentioned
    var mention = message.mentions.users.first();
    if (mention && mention.equals(client.user)) {
      // Handle the ping by calling help function
      log_usage(message, "help");
      return command_module.commands["help"](message, null);
    }
  }
};

// Setup events
client.on("ready", () => {
  console.log("Joined the fray.");
});
client.on("message", handleMessage);
client.login(bot_data.token, output_error);