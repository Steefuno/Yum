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
    CREATE TABLE
    IF NOT EXISTS
    info(id NOT NULL, text NOT NULL)
  `, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("${info_table_name} table is created.")
  }
);

/* module functions */
// note, each is asynchronous, so use a callback function

// get data from info table
exports.get_info = function(id, callback) {
  
}

// add info to table
exports.add_info = function(id, text, callback) {
  return db.run(`
    INSERT INTO ${info_table_name}(id text)
    VALUES ('${id}', '${text}')
  `, (err) => callback
  );
};

// update info in table
exports.update_info = function(id, text, callback) {
  return db.run(`
    UPDATE ${info_table_name}
    SET text = '${text}'
    WHERE id = '${id}'
  `, (err) => callback
  );
}

// remove info using an id from table
exports.remove_info = function(id, callback) {
  if (!id) {
    console.err("Invalid arguments, please refer to the help command");
  }
  
  return db.run(`
    DELETE FROM ${info_table_name}
    WHERE
      id = '${id}'
  `, (err) => callback
  );
}