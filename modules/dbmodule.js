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
      [user_id] INT8 NOT NULL PRIMARY KEY UNIQUE,
      [balance] INT8 DEFAULT 0
    )
  `, [], output_error);
  
  // create user inventories table to store items held
  db.run(`
    CREATE TABLE IF NOT EXISTS inventories (
      [user_id] INT8 NOT NULL,
      [item_id] INT8 NOT NULL,
      [amount] INT8 DEFAULT 0
    )
  `, [], output_error);
  db.run(`
    ALTER TABLE inventories
      ADD CONSTRAINT PK_USER_ITEM PRIMARY KEY (user_id, item_id);
  `, [], output_error);
}
init();


/* db functions */
// note, each is asynchronous, so use a callback function

// get data from info table
exports.get_info = function(id, callback) {
  return db.get(`
      SELECT (id, text)
      FROM ${info_table_name}
      WHERE id = ?
    `, [id], callback
  );
};

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