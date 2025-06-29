
const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        avatar: picture,
        provider: 'google',
      });
    }

    const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: jwtToken, user });

  } catch (err) {
    console.error(err);
    res.status(401).send('Google authentication failed');
  }
});

module.exports = router;
