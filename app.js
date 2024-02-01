const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("data");
});


app.post("/weather", function (req, res) {
    const query = req.body.cityName;
    const apikey = process.env.API_KEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit + "#";

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            res.render('weather', { weatherData });
        });
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is up and running.")
});
