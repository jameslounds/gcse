const router = require("express").Router();


// return a list of tags
router.get("/", (req, res, next) => {
    return res.json({
        "webpage": "found"
    });
});

module.exports = router;