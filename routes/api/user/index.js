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
    if (!req.jwt) {
        return res.json({
            error: "invalid jwt"
        });
    }
    const uid = req.jwt.uid;

    const username = await getUsername(uid);

    return res.json({
        username: username
    });
});

router.post("/login", async (req, res) => {

    const loginAttempt = await verifyUser(req.body.username, req.body.password);

    console.log(loginAttempt);

    const uid = await getUid(req.body.username);

    //if they are a valid user and we haven't already, let's set a cookie so we can remember them
    //or if they have just logged in with a different user
    if (loginAttempt.success) {
        if (!req.cookies.jwt || req.jwt.uid !== uid) {
            const sid = sidGen.create();
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

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    return res.redirect("/");
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