const Discord = require("discord.js");
const dbmodule = require("./../../../dbmodule");

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

// outputs a database instruction with multiple rows
const db_all = function(message, args) {
  console.log(args);
  return dbmodule.all(args, (err, rows) => {
    if (err) {
      message.reply(err, output_error);
      return console.error(err);
    }
    message.reply(JSON.stringify(rows));
    return console.log(rows);
  });
}
exports.func = db_all;