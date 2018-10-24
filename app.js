var express = require("express");
var app = express();
app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
// https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
// https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
// https://www.toptal.com/nodejs/secure-rest-api-in-nodejs