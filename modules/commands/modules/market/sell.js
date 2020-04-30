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
  
  // if only one number argument was given, user is buying 1 of item_id [1]
  if (command_content[2].length == 0) {
    amount = 1;
    item_id = parseInt(command_content[1]);
  // if 2 number arguments were given, user is buying [1] of item_id [2]
  } else {
    amount = parseInt(command_content[1]);
    item_id = parseInt(command_content[2]);
  }
  
  console.log(amount, item_id);
  
  // check if select item_id is being sold
  return market.get_catalog((catalog) => {
    var price = catalog[1][item_id];
    
    // check if item doesn't exist
    if (price == null) {
      return message.reply("check your inventory again for IDs, item " + item_id + " doesn't exist.", output_error);
    }
    
    // check if user has item to sell
    return dbmodule.get_inventory_item(message.author.id, item_id, (err, row) => {
      if (err) {
        console.error("Can't get inventory_item " + item_id + " from " + message.author.id);
        return message.reply("oops, something went wrong!", output_error);
      }
      
      // if user does not have item or not enough
      if (row == null || row.amount < amount) {
        return message.reply("uh, I'm not gonna buy from you if you don't have the items", output_error);
      }
      
      // remove item from player
      return dbmodule.set_inventory_item(message.author.id, )
      
      // get user's balance
      return dbmodule.get_balance(message.author.id, (err, row) => {
        if (err) {
          console.error("Can't get balance of " + message.author.id);
        }

        // get balance from db row or default
        var balance;
        if (row == null) {
          balance = 0;
        } else {
          balance = row.balance;
        }

        // get new balance
        balance = balance + (price * amount);

      
      });
    });
  });
}