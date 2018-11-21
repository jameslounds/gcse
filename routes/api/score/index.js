const router = require("express").Router();
const {
    saveScore
} = require("../../../login.js");


router.post("/send", async (req, res) => {
    const score = req.body.score;
    if (score > 15 || !score) {
        return res.json({
            error: "invalid score"
        });
    }
    saveScore(req.jwt.uid, score);
    return res.json({
        success: "true"
    });
});

module.exports = router;