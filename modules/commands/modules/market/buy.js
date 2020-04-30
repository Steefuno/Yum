const Discord = require("discord.js");
const bot_data = require("./../../../bot_data");
const dbmodule = require("./../../../dbmodule");
const market =  require("./../../market");

var currency = bot_data.currency;

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

exports.func = function(message, command_content) {
  var patt = /([0-9]+)\s?([0-9]*)/;
  command_content = command_content[2].match(patt);
  if (command_content == null) {
    return message.reply("something's up with your command. Use the market command for more info.", output_error);
  }
  
  var amount;
  var item_id;
  // If only one number argument was given, user is buying 1 of item_id [1]
  if (command_content[2].length == 0) {
    amount = 1;
    item_id = parseInt(command_content[1]);
  // If 2 number arguments were given, user is buying [1] of item_id [2]
  } else {
    amount = parseInt(command_content[1]);
    item_id = parseInt(command_content[2]);
  }
  
  console.log(amount, item_id);
  
  // Check if select item_id is being sold
  return market.get_catalog((catalog) => {
    var i;
    for (i=0; i<catalog[0].length; i++) {
      // if item is being sold today, deduct money and purchase
      if (catalog[0][i][0] == item_id) {
        // get user's money
        return dbmodule.get_balance(message.author.id, (err, row) => {
          if (err) {
            console.error("Can't get balance of " + message.author.id);
            console.error(err);
            return message.reply("oops, something went wrong! You didn't lose " + currency + ", but you didn't buy the item either.", output_error);
          }
          
          var balance;
          if (row == null) {
            balance = 0;
          } else {
            balance = row.balance;
          }
          
          // if not enough money
          if (balance < catalog[0][i][2] * amount) {
            return message.reply("sorry, you need more " + currency + ".", output_error);
          }
          
          // if enough money, deduct
          return dbmodule.set_balance(message.author.id, balance - (catalog[0][i][2] * amount), (err) => {
            if (err) {
              console.error("Can't set balance of " + message.author.id);
              console.err(err);
              return message.reply("oops, something went wrong! You didn't lose " + currency + ", but you didn't buy the item either.", output_error);
            }
            
            // increment inventory
            dbmodule.add_inventory_item(message.author.id, catalog[0][i][0], amount, (err) => {
              if (err) {
                console.error("FATAL: Can't increment inventory item of " + message.author.id);
                console.error(err);
                return message.reply("shoot! Something went horribly wrong, you lost " + currency + " and didn't get the goods!", output_error);
              }
              
              var embed = new Discord.MessageEmbed()
                .setTitle("Purchase Successful")
                .setDescription("You bought " + amount + " " + catalog[0][i][1] + " for " + (catalog[0][i][2] * amount) + " " + currency + ".")
                .setFooter(message.author.username + "#" + message.author.discriminator)
                .setColor(6611350)
              ;

              return message.channel.send("", embed, output_error);
            });
          });
        });
      }
    }
    return message.reply("that item isn't being sold today.", output_error);
  });
};