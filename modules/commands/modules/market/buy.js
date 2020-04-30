const Discord = require("discord.js");
const dbmodule = require("./../../../dbmodule");
const market =  require("./../../market");

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
    for (i=0; i<catalog.length; i++) {
      // if item is being sold today, deduct money and purchase
      if (catalog[i][0] == item_id) {
        // get user's money
        return dbmodule.get_balance(message.author.id, (balance) => {
          
        });
      }
    }
    return message.reply("that item isn't being sold today.", output_error);
  });
}