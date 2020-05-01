/*
  https://www.sqlitetutorial.net/what-is-sqlite/
  https://github.com/mapbox/node-sqlite3
*/

const fs = require("fs");

/* init sqlite db */
const file = "./.data/sqlite.db";
const exists = fs.existsSync(file);
const sqlite3 = require("sqlite3").verbose();

// output error if exists
const output_error = function(err) {
  if (err) {
    return console.error(err);
  }
  return;
};

// open file
const db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the secret service.");
});

const init = function() {
  // create balances table to store amount of money users have
  db.run(`
    CREATE TABLE IF NOT EXISTS balances (
      [user_id] TEXT NOT NULL,
      [balance] TEXT DEFAULT "0",
      [daily] TEXT DEFAULT "0",
      PRIMARY KEY (user_id),
      UNIQUE (user_id)
    )
  `, [], (err) => {
    if (err) {
      return console.error(err);
    }
    
    // create items
    db.run(`
      CREATE TABLE IF NOT EXISTS items (
        [item_id] INTEGER NOT NULL,
        [name] TEXT NOT NULL,
        [description] TEXT DEFAULT "",
        [min_price] INTEGER NOT NULL,
        [max_price] INTEGER NOT NULL,
        [on_catalog] INTEGER NOT NULL,
        PRIMARY KEY (item_id),
        UNIQUE (item_id)
      )
    `, [], (err) => {
      if (err) {
        return console.error(err);
      }
      
      // create user inventories table to store items held
      db.run(`
        CREATE TABLE IF NOT EXISTS inventories (
          [user_id] TEXT NOT NULL,
          [item_id] INTEGER NOT NULL,
          [amount] INTEGER DEFAULT 0,
          PRIMARY KEY (user_id, item_id),
          UNIQUE (user_id, item_id),
          FOREIGN KEY (item_id) REFERENCES items (item_id)
            ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES balances (user_id)
            ON DELETE CASCADE
        )
      `, [], (err) => {
        if (err) {
          return console.err(err);
        }
        return console.log("DB initialized.");
      });
    });
  });
};
init();


/* db functions */
// note, each is asynchronous, so use a callback function

// get a player's balance
const get_balance = function(user_id, callback) {
  return db.get(`
    SELECT (balance)
    FROM balances
    WHERE (user_id = ?)
  `, [user_id], callback);
};

// set a player's balance
const set_balance = function(user_id, value, callback) {
  return db.run(`
    INSERT INTO balances (user_id, balance, daily)
    VALUES (?, ?, 0)
    ON CONFLICT(user_id) DO UPDATE
      SET balance = excluded.balance
  `, [user_id, value], callback);
};

// adds to a player's balance
const add_balance = function(user_id, value, callback) {
  return db.run(`
    INSERT OR REPLACE
    INTO balances (user_id, balance, daily)
    VALUES
    (
      ?, 
      (
        COALESCE
        (
          (
            SELECT balance
            FROM balances
            WHERE user_id = ?
          ), 0
        ) + ?
      ),
      0
    )
    ON CONFLICT(user_id) DO UPDATE
    SET balance = excluded.balance
  `, [user_id, user_id, value], callback);
};

// gets when player last did daily
const get_daily_time = function(user_id, callback) {
  return db.get(`
    SELECT daily
    FROM balances
    WHERE user_id = ?
  `, [user_id], callback);
};

// sets daily time as now
// https://www.sqlite.org/lang_UPSERT.html
const set_daily_time = function(user_id, callback) {
  return db.run(`
    INSERT INTO balances(user_id, balance, daily)
    VALUES (?, 0, ?)
    ON CONFLICT(user_id) DO UPDATE
      SET daily = excluded.daily
  `, [user_id, Math.floor(Date.now()/1000/60)], callback);
};

// gets data on an item
const get_item_info = function(item_id, callback) {
  return db.get(`
    SELECT *
    FROM items
    WHERE (item_id = ?)
  `, [item_id], callback);
};

// gets all items that can appear on the catalog
const get_catalog_items = function(callback) {
  return db.all(`
    SELECT *
    FROM items
    WHERE (on_catalog = 1)
    ORDER BY item_id ASC
  `, [], callback);
};

// update or create an item
// item_id is generated by sqlite for a new item if null
const set_item = function(item_id, name, description, min_price, max_price, callback) {
  return db.run(`
    INSERT OR REPLACE
    INTO items (item_id, name, description, min_price, max_price)
    VALUES (?, ?, ?, ?, ?)
  `, [item_id, name, description, min_price, max_price], callback);
};

// gets a player's inventory
const get_inventory = function(user_id, callback) {
  return db.all(`
    SELECT *
    FROM inventories
    WHERE (user_id = ?)
    ORDER BY (item_id)
  `, [user_id], callback);
};

// gets a player's inventory about 1 specific item_id
const get_inventory_item = function(user_id, item_id, callback) {
  return db.get(`
    SELECT *
    FROM inventories
    WHERE (user_id = ? AND item_id = ?)
  `, [user_id, item_id], callback);
};

// sets data for an inventory item for one player
const set_inventory_item = function(user_id, item_id, amount, callback) {
  console.log("Setting",user_id,item_id,amount);
  return db.run(`
    INSERT OR REPLACE
    INTO inventories (user_id, item_id, amount)
    VALUES (?, ?, ?)
  `, [user_id, item_id, amount], callback);
};

// adjusts data for an inventory item for one player
const add_inventory_item = function(user_id, item_id, amount, callback) {
  return db.run(`
    INSERT OR REPLACE
    INTO inventories (user_id, item_id, amount)
    VALUES
    (
      ?,
      ?, 
      (
        COALESCE
        (
          (
            SELECT amount
            FROM inventories
            WHERE
              user_id = ? AND
              item_id = ?
          ), 0
        ) + ?
      )
    )
  `, [user_id, item_id, user_id, item_id, amount], callback);
};

exports.get_balance = get_balance;
exports.set_balance = set_balance;
exports.add_balance = add_balance;
exports.get_daily_time = get_daily_time;
exports.set_daily_time = set_daily_time;
exports.get_item_info = get_item_info;
exports.get_catalog_items = get_catalog_items;
exports.set_item = set_item;
exports.get_inventory = get_inventory;
exports.get_inventory_item = get_inventory_item;
exports.set_inventory_item = set_inventory_item;
exports.add_inventory_item = add_inventory_item;


// (instruction, callback) => {}
exports.run = function(sql, callback) {
  return db.run(sql, [], callback);
}
exports.get = function(sql, callback) {
  return db.get(sql, [], callback);
}
exports.all = function(sql, callback) {
  return db.all(sql, [], callback);
}