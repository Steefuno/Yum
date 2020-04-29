const Discord = require("discord.js");
const dbmodule = require("./../../../dbmodule");

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

// runs a database instruction
const db_run = function(message, args) {
  console.log(args);
  return dbmodule.run(args, (err) => {
    if (err) {
      message.reply(err, output_error);
      return console.error(err);
    }
    return message.reply("I have successfully ran the db instruction.");
  });
}
exports.func = db_run;