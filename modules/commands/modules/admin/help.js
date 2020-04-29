const Discord = require("discord.js");
const bot_data = require("./../../../bot_data");

const prefix = bot_data.prefix;

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

// Sends an embed message of commands for admins
const show_admin_help = function(message, args) {
  var embed = new Discord.MessageEmbed()
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
    .setTitle("Admin Menu")
    .setDescription("\
      The prefix is currently **" + prefix + " admin**\n\
      " + prefix + " admin - opens this help menu\n\
      " + prefix + " admin run INSTRUCTION - run a database instruction\n\
      " + prefix + " admin get INSTRUCTION - outputs a database instruction\n\
      " + prefix + " admin set_bal USERMENTION AMOUNT - sets a users balance\
    ")
  ;
  return message.channel.send("", embed, output_error);
}
exports.func = show_admin_help;