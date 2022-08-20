//import db.js module
var db = require("./db");

class Blog {
	//fetch all blogs
	static all(callback) {
		const sql = "select * from blog order by blogid desc";
		db.all(sql, [], (err, rows) => {
			if (err) return console.error(err.message);
			callback(rows);
		});
	}

	//find blog
	static find(id) {
		return new Promise((resolve, reject) => {
			db.get("select * from blog where blogid = ?", id, (err, row) => {
				if (err) {
					reject(err);
				} else {
					resolve(row);
				}
			});
		});
	}

	//search for blog
	static search(searchTerm) {
		return new Promise((resolve, reject) => {
			db.get("select * from blog where title = ?", searchTerm, (err, row) => {
				if (err) {
					reject(err);
				} else {
					resolve(row);
				}
			});
		});
	}

	//create blog
	static create(data, date, creator, callback) {
		let sql =
			"insert into blog (creator, createDate, title, content) values (?, ?, ?, ?)";
		db.run(sql, creator, date, data.title, data.content, callback);
	}

	//delete blog
	static delete(id, callback) {
		if (!id) return callback(new Error("Please provide an id"));
		db.run("delete from blog where blogid = ?", id, callback);
	}

	//edit blog
	static edit(data, id, callback) {
		console.log(data.title);
		let sql = "update blog set title = ?, content = ? where blogid = ?";
		db.run(sql, data.title, data.content, id, callback);
	}
}

module.exports = db;
module.exports.Blog = Blog;
