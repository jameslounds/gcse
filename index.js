const {
    saveScore
} = require("./login");

const express = require("express");
const app = express();

app.use("/gcse", express.static("./frontend/build"));

const morgan = require("morgan");
app.use(morgan("combined"));

const port = 5000;

const hbs = require("hbs");
app.set("view engine", "hbs");

const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const jwt = require("express-jwt");
app.use(
    jwt({
        secret: "bodacious",
        credentialsRequired: false,
        requestProperty: "jwt",
        getToken: req => req.cookies.jwt
    })
);

app.use("/api", require("./routes/api"));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});