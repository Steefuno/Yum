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
  var patt = /(\S+)\s(\S+)/;
  command_content = command_content[2].match(patt);
  if (command_content == null) {
    return message.reply("something's up with your command. Use the market command for more info.", output_error);
  }
  
  // 
  var item_id = parseInt(command_content[2]);
  if (item_id == NaN) {
    
  }
  
  console.log(command_content);
  
  return market.get_catalog((catalog) => {
    
  });
}