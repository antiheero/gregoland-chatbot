const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const router = express.Router();
const CLIENT_ID = "684464572333293605";
const CLIENT_SECRET = "R1RLwL30t4vMeFJtGGemNiMELzoef_r2";
const redirect = encodeURIComponent('https://gregoland-chatbot.herokuapp.com/api/botregister/callback');

router.get('/login', (req, res) => {
	res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot%20identify&response_type=code&redirect_uri=${redirect}`);
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
	const fetchDiscordUserInfo = await fetch('http://discordapp.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${json.access_token}`,
			}
		});
	const userInfo = await fetchDiscordUserInfo.json();
	res.send(userInfo)
}));
module.exports = router;
