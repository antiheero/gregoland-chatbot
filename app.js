const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const fs = require('fs');
const favicon = require('express-favicon');
app.use(express.json());
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(favicon('/public/favicon.ico'));

const indexhtml = fs.readFileSync('public/index.html', 'utf8');
const html404 = fs.readFileSync('public/404.html', 'utf8');

app.get("/my", function(req, res) {
	res.render("pages/index")
});

app.get("/eco", function(req, res) {
	const eco = fs.readFileSync('eco.json', 'utf8');
	res.send(eco)
});

app.get("/", function(req, res) {
	//when we get an http get request to the root/homepage
	res.send(indexhtml);
});
app.use('/api/discord', require('./api/discord'));
app.use('/api/botregister', require('./api/botregister'));
app.use((err, req, res, next) => {
	switch (err.message) {
		case 'NoCodeProvided':
			return res.status(400).send({
				status: 'ERROR',
				error: err.message,
			});
		default:
			return res.status(500).send({
				status: 'ERROR',
				error: err.message,
			});
	}
});
app.get('*', function(req, res){
	res.status(404).send(html404);
});
app.listen(PORT, function() {
	console.log(`Listening on Port ${PORT}`);
});
