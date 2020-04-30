const Discord = require("discord.js");
const bot_data = require("./../bot_data");
const dbmodule = require("./../dbmodule");
const market = require("./market");

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

exports.func = function(message, command_content) {
  // get items owned
  return dbmodule.get_inventory(message.author.id, (err, rows) => {
    if (err) {
      console.err("Failed to get inventory of " + message.author.id);
      console.err(err);
      return message.reply("oops, a problem has occurred. Try again later.", output_error);
    }
    
    // get prices of items
    return market.get_catalog((catalog) => {
      var prices = catalog[1];
      
      var description = "";
      var embed = new Discord.MessageEmbed()
        .setTitle("Inventory")
        .setFooter(message.author.username + "#" + message.author.discriminator)
        .setColor(6611350)
      ;
      var num_items = 0;
      
      var i;
      for (i=0; i<rows.length; i++) {
        if (rows[i].amount > 0) {
          if (num_items > 0) {
            description = description + "\n";
          }
          description = description + rows[i].amount + "x - [ID:" + rows[i].item_id + "] " + prices[rows[i].item_id][1] + " [Value:" + prices[rows[i].item_id][0] + "]"
          num_items = num_items + 1;
        }
      }
      
      if (num_items == 0) {
        description = "You have no items."
      }
      
      embed = embed.setDescription(description);
      
      return message.channel.send("", embed, output_error);
    });
  });
}

exports.help = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Inventory")
    .setDescription("View your items and their current sell prices on the catalog.")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "inv",
  "inventory",
  "bag",
  "items"
];