var path = require("path");
const sqlite3 = require("sqlite3").verbose();

// open the database connection
let DB_PATH = path.join(__dirname, "blog.db");
let db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
	if (err) console.error(err.message);
	console.log("Connected to " + DB_PATH + " database.");

	// Enable foreign keys
	db.run("PRAGMA foreign_keys = ON;", (error) => {
		if (error) console.error("Pragma statement didn't work.");
		else console.log("Foreign Key Enforcement is on.");
	});
});

db.serialize(() => {
	//list all tables in the database
	db.all("select name from sqlite_master where type='table'", (err, table) => {
		console.log(table);
	});

	//list out all data in blog table
	db.all("select * from blog", (err, blogs) => {
		console.log(blogs);
	});

	//list out all data in user table
	db.all("select * from user", (err, users) => {
		console.log(users);
	});
});

module.exports = db;
