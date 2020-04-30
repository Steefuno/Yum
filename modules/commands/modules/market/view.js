const Discord = require("discord.js");
const dbmodule = require("./../../dbmodule");
const market =  require("./../../market");

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

exports.func = function(message, command_content) {
  return market.get_catalog((catalog) => {
    var embed = new Discord.MessageEmbed()
      .setTitle("Help Menu")
      .setDescription("\
        The prefix is currently **" + prefix + "**\n\
        " + prefix + " SOME_COMMAND - gives more info on a command\n\
        " + prefix + " help - opens this help menu\n\
        " + prefix + " bal - displays how much money you have\n\
        " + prefix + " market - displays market commands\n\
        " + prefix + " credits - shows anyone that helped with the game\
      ")
      .setFooter(message.author.username + "#" + message.author.discriminator)
      .setColor(6611350)
    ;

    return message.channel.send("", embed, output_error);
  });
}