const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys');
const router = express.Router();
const User = mongoose.model('User');

//creating data for signup screen
router.post('/api/v1/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

//creating data for signin screen
router.post('/api/v1/signin', async (req, res) => {
  const { email, password } = req.body;
  if ((!email || !password)) {
    return res.status(422).send({ error: 'must provide email or password' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'must provide email or password' });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'must provide email or password' });
  }
});

//getting  All data details for signup & signin  screen
router.get(`/api/v1/getAllData`, async (req, res) => {
  const user = await User.find();
  if (!user) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(user);
});

//updating users by id
router.put(`/api/v1/update:id`, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true },
  );

  if (!user) return res.status(400).send('the user cannot be updated!');

  res.send(user);
});

//deleting users  by id
router.delete(`/api/v1/delete/:id`, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: 'the user is deleted!' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'user not found!' });
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
