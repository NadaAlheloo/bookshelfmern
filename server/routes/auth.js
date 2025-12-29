
    const express = require('express');
    const bcrypt = require('bcrypt');
    const User = require('../models/User');
    const router = express.Router();

    router.post('/register', async (req, res) => {
      const hashed = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ username: req.body.username, password: hashed });
      res.json(user);
    });

    router.post('/login', async (req, res) => {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(401).end();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.status(401).end();
      req.session.userId = user._id;
      res.json(user);
    });

    router.post('/logout', (req, res) => {
      req.session.destroy(() => res.end());
    });

    module.exports = router;
    