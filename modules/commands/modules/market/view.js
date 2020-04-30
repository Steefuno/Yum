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
    var description = "";
    var i;
    for (i=0; i<catalog.length; i++) {
      description = description + ""
    }
    
    var embed = new Discord.MessageEmbed()
      .setTitle("Today's Catalog")
      .setDescription(description)
      .setFooter(message.author.username + "#" + message.author.discriminator)
      .setColor(6611350)
    ;

    return message.channel.send("", embed, output_error);
  });
}