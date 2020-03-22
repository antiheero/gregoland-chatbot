const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const router = express.Router();
const CLIENT_ID = "684464572333293605";
const CLIENT_SECRET = "R1RLwL30t4vMeFJtGGemNiMELzoef_r2";
const redirect = encodeURIComponent('https://gregoland-chatbot.herokuapp.com/api/discord/callback');

router.get('/login', (req, res) => {
	res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds&response_type=code&redirect_uri=${redirect}`);
});
router.get('/callback', catchAsync(async (req, res) => {
	if (!req.query.code) throw new Error('NoCodeProvided');
	const code = req.query.code;
	const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
	const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ${creds}`,
			},
		});
	const json = await response.json();
	res
		.status(201)
		.cookie('auth', `Bearer ${json.access_token}`, {
			expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
		})
	console.log(req.cookie)
	res
		.redirect(301, `/my`);
}));
module.exports = router;
