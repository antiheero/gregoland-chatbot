const express = require('express');
const fetch = require('node-fetch');
const { catchAsync } = require('../utils');
const router = express.Router();

router.get('/my', catchAsync(async (req, res) => {
	const fetchDiscordUserInfo = await fetch('http://discordapp.com/api/users/@me', {
		headers: {
			Authorization: req.cookies.auth,
		}
	})
	const userInfo = await fetchDiscordUserInfo.json();
	console.log(userInfo);
}));
module.exports = router;
