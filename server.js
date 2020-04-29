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

const handle_message = function(message) {
  // Ignore bot messages
  if (message.author.bot) return;
  
  // Check if message is in command format
  var command_data = command_module.get_command(message.content);
  if (command_data != null) {
    // Handle a command
    return command_module.handle_command(message, command_data);
  } else {
    // Check if bot has been mentioned
    var mention = message.mentions.users.first();
    if (mention && mention.equals(client.user)) {
      // Handle the ping by calling help function
      return command_module.commands["help"](message, null);
    }
    
    // Probably just a misc chat message ¯\_(ツ)_/¯
  }
};

// Output and recover from error
const handle_error = function(err) {
  console.error(err);
  
  // Attempt to login? Untested, not sure if client is removed on error
  setTimeout(() => {
    client.login(bot_data.token, output_error);
  }, 20*1000)
}

// Setup events
client.on("ready", () => {
  console.log("Joined the fray.");
});
client.on("error", handle_error);
client.on("message", handle_message);
client.login(bot_data.token, output_error);