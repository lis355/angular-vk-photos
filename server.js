var express = require("express");
var app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/*", function (req, res) {
	res.sendFile(__dirname + "/dist/index.html");
});

let port = process.env.PORT || 9000;

app.listen(port, function () {
	console.log(`Server start o port ${port}!`);
});
