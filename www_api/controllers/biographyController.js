const Biography = require('../models/biography');
const { body, validationResult } = require('express-validator');

exports.allBiographies = async (req, res, next) => {
  try {
    let bios = await Biography.find({}, { title: 1, content: 1 });
    if (bios.length === 0) {
      return res.status(404).json({ message: 'Δε βρέθηκαν βιογραφίες' });
    }
    return res.status(200).json(bios);
  } catch (err) {
    return res.status(500).json({ message: 'Λάθος στη βάση: ' + err });
  }
};

exports.updateBiography = async (req, res, next) => {
  try {
    if (req.user.admin) {
      let bio = await Biography.findByIdAndUpdate(req.params.bioid, {
        title: req.body.title,
        content: req.body.content,
      });

      if (!bio) {
        return res
          .status(404)
          .json({ message: `Δε βρέθηκε βιογραφία με id ${req.params.bioid}` });
      }
      res.status(200).json({
        message: `Βιογραφία με id ${req.params.bioid} updated`,
        bio: bio,
      });
    } else {
      return res.status(403).json({
        message: 'Πρέπει να είστε διαχειριστής για να πραγματοποιήσετε αλλαγή',
      });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Λάθος στη βάση: ' + err });
  }
};

exports.deleteBiography = async (req, res, next) => {
  try {
    if (req.user.admin) {
      let bio = await Biography.findByIdAndDelete({ _id: req.params.bioid });
      if (!bio) {
        return res.status(404).json({
          err: `Δε βρέθηκε βιογραφία με id ${req.params.bioid}`,
        });
      }
      res.status(200).json({
        message: `Επιτυχία διαγραφής βιογραφίας ${req.params.bioid}`,
        bio: bio,
      });
    } else {
      return res.status(403).json({
        message:
          'Πρέπει να είστε διαχειριστής για να πραγματοποιήσετε διαγραφή',
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.createBiography = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Εισάγετε Τίτλο βιογραφίας')
    .isLength({ max: 20 })
    .withMessage('Ο τίτλος πρέπει να περιέχει λιγότερους από 20 χαρακτήρες'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Εισάγετε περιεχόμενο'),
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        data: req.body,
      });
    }
    try {
      let bio = new Biography({
        title: req.body.title,
        content: req.body.content,
      });
      await bio.save();
      console.log('Δημιουργία επιτυχής');
      res.status(200).json({ bio });
    } catch (err) {
      res.status(500).json({ message: 'Σφάλμα στη βάση: ' + err });
    }
  },
];
