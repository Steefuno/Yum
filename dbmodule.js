const fs = require("fs");

// init sqlite db
const file = "./.data/sqlite.db";
const exists = fs.existsSync(file);
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the chinook database.");
});

// create info table
db.run('CREATE TABLE info(id text)', (err) => {
  if (err) {
    console.err(err.message);
  }
  console.log("info table is created.")
});

exports.