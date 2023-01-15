const jwt = require('jsonwebtoken');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.login = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        let error = new Error('Δε βρέθηκε λογαριασμός διαχειρηστή');
        return res.status(403).json({ info });
      }
      req.login(user, { session: false }, err => {
        if (err) return next(err);

        const body = {
          _id: user._id,
          username: user.username,
          admin: user.admin,
        };
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {
          expiresIn: '1d',
        });

        return res.status(200).json({ body, token });
      });
    })(req, res, next);
  } catch (err) {
    res.status(403).json({ err });
  }
};

exports.register = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .custom(async username => {
      try {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) throw new Error('Το όνομα χρήστη υπάρχει');
      } catch (err) {
        throw new Error(err);
      }
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Εισάγετε κωδικό με τουλάχιστο 6 χαρακτήρες'),
  body('confirmPassword').custom(async (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Οι κωδικοί είναι διαφορετικοί');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({
        username: req.body.username,
        errors: errors.array(),
      });
    }
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      admin: true,
    });
    user.save(err => {
      if (err) return next(err);
      res.status(200).json({
        message: 'Επιτυχής Εγγραφή Διαχειριστή',
      });
    });
  },
];
