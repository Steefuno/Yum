const Discord = require("discord.js");
const bot_data = require("./../bot_data");
const dbmodule = require("./../dbmodule");
const command_module = require("./../command_module.js");
const seed_random = require("seedrandom");

const catalog_magic_num = 0; // Add to random number seed to get catalog

const prefix = bot_data.prefix;
const modules = [
  "catalog",
  "buy"/*,
  "sell"*/
];
var commands = []

// Caches the catalog for 30 seconds
var catalog_cache;
var catalog_cache_prev = -1;
var catalog_cache_timeout = 30*1000;

// Loop through all command modules
modules.forEach(function(command) {
  var command_data = require("./modules/market/" + command);
  commands[command] = command_data.func;
});

const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
}

const display_commands = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Market")
    .setDescription("\
      " + prefix + " market catalog - displays today's catalog\n\
      " + prefix + " market buy AMOUNT ID - buys AMOUNT market items\n\
      " + prefix + " market sell AMOUNT ID - sells AMOUNT items to the market\n\
      \nfor the buy and sell commands, if you just use ID, I'll sell you one.\
    ")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;

  return message.channel.send("", embed, output_error);
}

const get_catalog = function(callback) {
  var current_time = Date.now();
  if (catalog_cache == null || catalog_cache_prev - current_time > catalog_cache_timeout) {
    // If cache is unavailable
    // Get daily seed
    var seed = Math.floor(current_time / 1000 / 60 / 60 / 24) + catalog_magic_num;
    var rng = seed_random(seed);

    return dbmodule.get_catalog_items((err, items) => {
      var catalog = [];
      var i;
      for (i=0; i<bot_data.num_catalog_items; i++) {
        if (items.length == 0) break; // stop on no items
        var item_num = Math.floor(items.length * rng()); // random item
        var item_id = items[item_num].item_id;
        var item_name = items[item_num].name;
        var price = (items[item_num].max_price - items[item_num].min_price) * rng() + items[item_num].min_price; // random price in range
        catalog.push([item_id, item_name, Math.floor(price)]);

        //splice to disable duplicates
        items.splice(item_num, 1);
      }

      // refresh cache
      catalog_cache = catalog;
      catalog_cache_prev = current_time;
      return callback(catalog);
    });
    
  // If cache is available
  } else {
    return callback(catalog_cache);
  }
}
exports.get_catalog = get_catalog;

exports.func = function(message, command_content) {
  if (command_content[2].length == 0) {
    return display_commands(message, command_content);
  } else {
    var patt = /(\S*)\s?(.*)/;
    command_content = command_content[2].match(patt);
    if (command_content == null) {
      return message.reply("something's up with your command. Use the market command for more info.", output_error);
    }
    
    var command = commands[command_content[1]];
    if (command == null) {
      return message.reply("dude, that doesn't exist. Use the market command for more info.", output_error);
    }
    return command(message, command_content);
  }
}

exports.help = function(message, command_content) {
  var embed = new Discord.MessageEmbed()
    .setTitle("Help Balance")
    .setDescription("This is the module to access the market commands.")
    .setFooter(message.author.username + "#" + message.author.discriminator)
    .setColor(6611350)
  ;
  
  return message.channel.send("", embed, output_error);
}

exports.aliases = [
  "shop",
  "market",
  "supermarket",
  "store"
];