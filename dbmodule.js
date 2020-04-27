const fs = require("fs");

const info_table_name = "info";

/* init sqlite db */
const file = "./.data/sqlite.db";
const exists = fs.existsSync(file);
const sqlite3 = require("sqlite3").verbose();

// open file
const db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

// create info table
db.run(`
    CREATE TABLE IF NOT EXISTS
    info(
      id NOT NULL,
      text
    )
  `, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("${info_table_name} table is created.")
  }
);

// add function
exports.add_info = function(id, text) {
  if (!id || !text) {
    console.error("Invalid arguments, please refer to the help command");
  }
  
  db.run(`
    INSERT INTO ${info_table_name}(id text)
    VALUES
      ('${id}', '${text}')
  `, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  return;
};

// remove function
exports.remove_info = function(id) {
  if (!id) {
    console.err("Invalid arguments, please refer to the help command");
  }
  
  db.run(`
    DELETE FROM ${info_table_name}
    WHERE
      id = '${id}'
  `, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  return;
}