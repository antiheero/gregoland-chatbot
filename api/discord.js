const express = require('express');
const router = express.Router();
const CLIENT_ID = "684464572333293605";
const CLIENT_SECRET = "R1RLwL30t4vMeFJtGGemNiMELzoef_r2";
const redirect = encodeURIComponent('https://gregoland-chatbot.herokuapp.com/api/discord/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

module.exports = router;
