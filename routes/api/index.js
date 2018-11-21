const router = require("express").Router();

router.use("/deck", require("./deck/"));
router.use("/user", require("./user/"));
router.use("/score", require("./score"));

module.exports = router;