const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("recipes_store.db3", (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to database successfully.");
  }
});

module.exports = db;
