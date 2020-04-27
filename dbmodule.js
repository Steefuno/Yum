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
  console.log("Connected to the chinook database.");
});
// create info table
db.run("CREATE TABLE info(id text)", (err) => {
  if (err) {
    console.err(err.message);
  }
  console.log("info table is created.")
});

// add 
exports.add_info = function(id, text) {
  if (!id || !text) {
    console.err("invalid input");
  }
  
  db.run("INSERT INTO info(id text) VALUES ${id} ${text}", (err) => {
    if (err) {
      console.err(err.message);
    }
  });
};

// remove
exports.remove_info = function(id) {
  if (!id) {
    console.err("Invalid arguments, please refer to the help command");
  }
}