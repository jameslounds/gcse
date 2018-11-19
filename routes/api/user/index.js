const router = require("express").Router();

const sidGen = require("node-sid")({
    len: 10
});

const cookieSetter = require("jsonwebtoken");

const {
    getUsername,
    verifyUser,
    getUid,
    createUser
} = require("../../../login.js");

router.get("/me", async (req, res) => {

    let username = await getUsername("1");
    if (!req.jwt) {
        return res.json({
            username: username
        });
    }

    console.log(`uid: ${req.jwt.uid}`);
    username = await getUsername(req.jwt.uid);
    console.log(username);
    return res.json({
        username: username
    });
});

router.post("/login", async (req, res) => {

    const loginAttempt = await verifyUser(req.body.username, req.body.password);

    console.log(loginAttempt);
    console.log(`old jwt: ${req.cookies.jwt}`);

    //if they are a valid user and we haven't already, let's set a cookie so we can remember them
    if (loginAttempt.success) {
        if (!req.cookies.jwt) {
            const sid = sidGen.create();
            const uid = await getUid(req.body.username);
            const myjwt = cookieSetter.sign({
                    sid: sid,
                    uid: uid
                },
                "bodacious"
            );
            console.log(myjwt);
            res.cookie("jwt", myjwt);
        }
    }


    return res.json({
        success: loginAttempt.success,
        reason: loginAttempt.reason
    });

});

router.post("/register", async (req, res) => {
    //if the user already exists, don;'t try to re-register them
    const uid = await getUid(req.body.username);
    if (uid) {
        console.log(`user found with uid ${uid}`);
        return res.json({
            success: false,
            reason: "username"
        });
    }
    const attempt = await createUser(req.body.username, req.body.password);
    console.log(attempt);
    if (attempt.success) {
        return res.json({
            success: true
        });
    }
    return res.json(
        attempt
    );
});

router.post("/uid", (req, res) => {
    if (!req.body.username) {
        return res.json({
            error: "username not specified"
        });
    }
    return getUid(req.body.username).then(uid => {
        console.log(`uid: ${uid}`);
        return res.json({
            uid: uid
        });
    });
});

module.exports = router;