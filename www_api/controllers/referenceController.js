const Reference = require('../models/reference');
const { body, validationResult } = require('express-validator');

exports.allReferences = async (req, res, next) => {
  try {
    let ref = await Reference.find({}, { name: 1, url: 1 });
    if (ref.length === 0) {
      return res.status(404).json({ message: 'Δε βρέθηκαν αναφορές' });
    }
    return res.status(200).json(ref);
  } catch (err) {
    return res.status(500).json({ message: 'Σφάλμα στη βάση: ' + err });
  }
};

exports.updateReference = async (req, res, next) => {
  try {
    if (req.user.admin) {
      let ref = await Reference.findByIdAndUpdate(req.params.refid, {
        name: req.body.name,
        url: req.body.url,
      });

      if (!ref) {
        return res
          .status(404)
          .json({ message: `Δε βρέθηκε αναφορά με id ${req.params.refid}` });
      }
      res.status(200).json({
        message: `Αναφορά με id ${req.params.refid} άλλαξε`,
        ref: ref,
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

exports.deleteReference = async (req, res, next) => {
  try {
    if (req.user.admin) {
      let ref = await Reference.findByIdAndDelete({ _id: req.params.refid });
      if (!ref) {
        return res.status(404).json({
          err: `Δε βρέθηκε αναφορά με id ${req.params.refid}`,
        });
      }
      res.status(200).json({
        message: `Επιτυχία διαγραφής αναφοράς με id ${req.params.refid}`,
        ref: ref,
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

exports.createReference = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Εισάγετε Όνομα Παραπομπής')
    .isLength({ max: 20 })
    .withMessage('Το όνομα πρέπει να περιέχει λιγότερους από 20 χαρακτήρες'),
  body('url').trim().isLength({ min: 1 }).withMessage('Εισάγετε σύνδεσμο'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        data: req.body,
      });
    }
    try {
      let ref = new Reference({
        name: req.body.name,
        url: req.body.url,
      });
      await ref.save();
      console.log('Δημιουργία επιτυχής');
      res.status(200).json({ ref });
    } catch (err) {
      res.status(500).json({ message: 'Σφάλμα στη βάση: ' + err });
    }
  },
];
