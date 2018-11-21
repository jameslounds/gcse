const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const knex = require("knex")({
    client: "sqlite3",
    debug: false,
    connection: {
        filename: "users.db"
    },
    useNullAsDefault: true
});

function saveScore(id, score) {
    //get current time as a unix timestamp
    const now = Math.round((new Date()).getTime() / 1000);

    //put results in database
    return knex("results")
        .insert({
            uid: id,
            score: score,
            time: now
        }).then(response => {
             if (response) {
                return {
                    success: true
                };
            } else {
                return {
                    success: false,
                    reason: "database error"
                };
            }
        });
}

function getUid(username) {
    return knex.select("id").from("users").where({
        username: username
    }).then(rows => {
        if (rows !== []) {
            //if we actually got data back, return it
            return rows[0].id;
        }
        //that username does not exist, let's return false
        return false;
    });
}


function getUsername(uid) {
    return knex.select("username").from("users").where({
        id: uid
    }).then(rows => {
        if (rows !== []) {
            //if we actually got data back, return it
            return rows[0].username;
        }
        //that uid does not exist, let's return false
        return false;
    });
}

function createUser(username, password) {
    return userFound(username).then(found => {
        if (found) {
            //if the user already exists, we cannot register them again
            console.log("user already in db");
            return {
                success: false,
                reason: "username"
            };
        }

        return bcrypt.hash(password, 10).then(async hash => {
            //hash the password, and insert into db
            return knex("users")
                .insert({
                    username: username,
                    password: hash
                }).then(response => {
                    if (response) {
                        return {
                            success: true
                        };
                    } else {
                        return {
                            success: false,
                            reason: "database error"
                        };
                    }
                });
        }).catch(console.error);
    });
}

async function verifyUser(username, password) {
    if (!username) {
        throw ("missing username");
    }
    return await knex.select("password").from("users").
    where({
            username: username
        })
        .then(async rows => {
            if (!rows.length) {
                //if we get no rows back for that username, they haven't registered yet
                console.log(`no rows for ${username}`);
                return {
                    success: false,
                    reason: "username"
                };
            }
            const hash = rows[0].password;
            const success = await bcrypt.compare(password, hash);
            return {
                success: success
            };
        }).catch(err => {
            console.error(`got error from knex: ${err}`);
        });
}

function userFound(username) {
    return getUser(username).then(rows => rows.length !== 0);
}

function getUser(username) {
    return knex.select("password").from("users").where({
        "username": username
    });
}

module.exports = {
    getUid,
    saveScore,
    createUser,
    verifyUser,
    getUsername
};