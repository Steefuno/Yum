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
  var current_catalog = market.get_catalog();
  
}