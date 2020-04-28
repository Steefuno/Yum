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
}

// open file
const db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the secret service.");
});


const init = function() {
  // create balances table to store amount of money users have
  db.run(`
    CREATE TABLE IF NOT EXISTS balances (
      [user_id] INT8 NOT NULL UNIQUE,
      [balance] INT8 DEFAULT 0,
      PRIMARY KEY (user_id)
    )
  `, [], output_error);
  
  // create items
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      [item_id] INT8 NOT NULL UNIQUE,
      [name] NVARCHAR[32] NOT NULL,
      [description] NVARCHAR[128] DEFAULT "",
      PRIMARY KEY (item_id)
    )
  `, [], output_error);
  
  // create user inventories table to store items held
  db.run(`
    CREATE TABLE IF NOT EXISTS inventories (
      [user_id] INT8 NOT NULL,
      [item_id] INT8 NOT NULL,
      [amount] INT8 DEFAULT 0,
      PRIMARY KEY (user_id, item_id),
      FOREIGN KEY (item_id) REFERENCES items (item_id)
        ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES balances (user_id)
        ON DELETE CASCADE
    )
  `, [], output_error);
}
init();


/* db functions */
// note, each is asynchronous, so use a callback function

// get a player's balance
const get_balance = function(user_id, callback) {
  return db.get(`
    SELECT (balance)
    FROM balances
    WHERE (id = ?)
  `, [user_id], callback);
}
exports.get_balance = get_balance;

// set a player's balance
const set_balance = function(user_id, value, callback) {
  return db.run(`
    INSERT OR REPLACE INTO balances (user_id, balance)
    VALUES (?, ?)
  `, [value, user_id], callback);
}
exports.set_balance = set_balance;

// add info to table
exports.add_info = function(id, text, callback) {
  return db.run(`
      INSERT OR REPLACE INTO info
      VALUES
        (?, ?)
    `, [id, text], callback
  );
};

// remove info using an id from table
exports.remove_info = function(id, callback) {
  if (!id) {
    console.err("Invalid arguments, please refer to the help command");
  }
  
  return db.run(`
      DELETE FROM ${info_table_name}
      WHERE
        id = ?
    `, [id], callback
  );
};

// get all tuples in info
exports.get_all = function(callback) {
  return db.all(`
      SELECT *
      FROM ${info_table_name}
    `, [], callback
  )
}