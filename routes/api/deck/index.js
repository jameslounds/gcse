const router = require("express").Router();

const colors = {
    yellow: "ffc919",
    red: "ce2200",
    blue: "18c1e2"
};

router.get("/new", (req, res) => {
    let deck = [];

    const amount = req.query.amount;

    const length = Object.keys(colors).length;

    if (!amount || amount === "0") {
        //the 0 here must be a string because it is in the query string
        return res.json({
            error: "amount is a required property"
        });
    }

    if (amount % length !== 0) {
        //we can't make a deck if there won't be an equal number of cards per color
        return res.json({
            error: `amount not divisible by ${length}`
        });
    }

    for (let i in colors) {
        for (let j = 1; j <= amount / length; j++) {
            deck.push({
                color: colors[i],
                number: j
            });
        }
    }

    //arrays in js are mutable, passing it to the shuffle function will change it in place
    shuffle(deck);

    return res.json(deck);
});


function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

module.exports = router;