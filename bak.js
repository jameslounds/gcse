const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("users.db", (err) => {
    if (err) {
        console.error(err.message);
    }
});

db.all(`
    create table users(
        id INTEGER PRIMARY KEY,
        username text not null,
        password char(60) not null
    )`);

db.all(`
    create table results(
        id INTEGER PRIMARY KEY,
        uid integer not null,
        test text not null,
        score integer default 0,
        FOREIGN KEY(uid) REFERENCES users(id)
    )`);