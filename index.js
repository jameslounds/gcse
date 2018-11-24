const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("combined"));

const port = process.env.PORT || 5000; //allows heroku to specify its own port

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

app.use("/", express.static("./frontend/build"));

app.use("/api", require("./routes/api"));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});