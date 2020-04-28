const fs = require("fs");

/* init sqlite db */
const file = "./.data/sqlite.db";
const exists = fs.existsSync(file);
const sqlite3 = require("sqlite3").verbose();

// open file
const db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the secret service.");
});

// create balances table to store amount of money users have
db.run(`
    CREATE TABLE
    IF NOT EXISTS
    balances(
      [id] INT8 NOT NULL PRIMARY KEY UNIQUE,
      [balance] INT8 DEFAULT 0,
    )
  `, [], (err) => {
    if (err) {
      return console.error(err.message);
    }
  }
);
db.run(`
    CREATE TABLE
    IF NOT EXISTS
    inventories(
      [id] VARCHAR[]
    )
  `, [], (err) => {
    if (err) {
      return console.error(err.message);
    }
  }
);

/* module functions */
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