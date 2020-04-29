const Discord = require("discord.js");
const dbmodule = require("./../../../dbmodule");

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

// sets a user's balance
const set_bal = function(message, args) {
  var patt = /[^>]*[^0-9]*([0-9]*)[^0-9]*/;
  var command_content = args.match(patt);
  if (command_content == null) {
    return message.reply("try again, no value found.");
  }
  
  var new_bal = parseInt(command_content[1]);
  if (new_bal == NaN) {
    return message.reply("try again, invalid value.");
  }
  
  var target_user = message.mentions.members.first();
  if (target_user == null) {
    return message.reply("try again, no mentioned user found.");
  }
  target_user = target_user.user;
  
  return dbmodule.set_balance(target_user.id, new_bal, (err) => {
    if (err) {
      return console.error(err);
    }
    return message.reply("I have successfully set " + target_user.username + "#" + target_user.discriminator + "'s balance to " + new_bal + ".", output_error);
  })
}
exports.func = set_bal;