const Discord = require("discord.js");
const dbmodule = require("./../../../dbmodule");

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

// outputs a database instruction
const db_get = function(message, args) {
  console.log(args);
  return dbmodule.get(args, (err, row) => {
    if (err) {
      message.reply(err, output_error);
      return console.error(err);
    }
    message.reply(JSON.stringify(row));
    return console.log(row);
  });
}
exports.func = db_get;