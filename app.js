const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const fs = require('fs');
app.use(express.json());

app.use(express.static('public'));

const indexhtml = fs.readFileSync('index.html', 'utf8');

app.get("/", function(req, res) {
	//when we get an http get request to the root/homepage
	res.send(indexhtml);
});

app.listen(PORT, function() {
	console.log(`Listening on Port ${PORT}`);
});
