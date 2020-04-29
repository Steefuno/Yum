const Discord = require("discord.js");
const bot_data = require("./../bot_data");
const dbmodule = require("./../dbmodule");

const admin_commands = 

const prefix = bot_data.prefix;

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

const is_admin = function(user) {
  var i;
  for (i=0; i<bot_data.admins.length; i++) {
    if (bot_data.admins[i] == user.id) {
      return true;
    }
  }
  return false;
}

var commands = [];

// Sends an embed message of commands for admins
const show_admin_help = function(message, args) {
  var embed = new Discord.MessageEmbed()
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
    .setTitle("Admin Menu")
    .setDescription("\
      The prefix is currently **" + prefix + " admin**\n\
      " + prefix + " admin - opens this help menu\n\
      " + prefix + " admin run INSTRUCTION - run a database instruction\n\
      " + prefix + " admin get INSTRUCTION - outputs a database instruction\n\
      " + prefix + " admin set_bal USERMENTION AMOUNT - sets a users balance\
    ")
  ;
  return message.channel.send("", embed, output_error);
}
commands.help = show_admin_help;

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
commands.run = db_run;

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
commands.get = db_get;

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
commands.all = db_all;

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
commands.set_bal = set_bal;

// displays list of commands
exports.func = function(message, command_content) {
  // check usage permission
  if (!is_admin(message.author)) return;
  
  // run help function on no admin command
  if (command_content[2].length == 0) {
    return show_admin_help(message);
  }
  
  var patt = /(\S+)\s?(.*)/;
  command_content = command_content[2].match(patt);
  
  // if invalid
  if (command_content == null) {
    return console.error("Invalid admin command.");
  }
  
  // find and run admin command
  var func = commands[command_content[1].toLowerCase()];
  if (func != null) {
    return func(message, command_content[2]);
  }
  
  // help on invalid command
  return show_admin_help(message, command_content[2]);
}

exports.aliases = [
  "admin"
];