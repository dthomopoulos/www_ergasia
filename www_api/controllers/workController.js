const Work = require('../models/work');
const { body, validationResult } = require('express-validator');

exports.allWorks = async (req, res, next) => {
  try {
    let works = await Work.find(
      {},
      { name: 1, description: 1, genre: 1, pages: 1 }
    );
    if (works.length === 0) {
      return res.status(404).json({ message: 'No works found' });
    }
    return res.status(200).json(works);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error fetching works from database: ' + err });
  }
};

exports.updateWork = async (req, res, next) => {
  try {
    if (req.user.admin) {
      let work = await Work.findByIdAndUpdate(req.params.workid, {
        name: req.body.name,
        description: req.body.description,
        pages: req.body.pages,
        genre: req.body.genre,
      });
      console.log(work);
      if (!work) {
        return res
          .status(404)
          .json({ message: `No work with id ${req.params.workid} exists` });
      }
      res.status(200).json({
        message: `Work with id ${req.params.workid} updated`,
        work: work,
      });
    } else {
      return res
        .status(403)
        .json({ message: 'You must be an admin to update a work' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error updating work in database: ' + err });
  }
};

exports.deleteWork = async (req, res, next) => {
  try {
    if (req.user.admin) {
      let work = await Work.findByIdAndDelete({ _id: req.params.workid });
      if (!work) {
        return res
          .status(404)
          .json({ err: `No works with id ${req.params.workid} exists` });
      }
      res.status(200).json({
        message: `Work with id ${req.params.workid} deleted successfully`,
        work: work,
      });
    } else {
      return res
        .status(403)
        .json({ message: 'You must be an admin to perform this action' });
    }
  } catch (err) {
    return next(err);
  }
};

exports.createWork = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Εισάγετε τίτλο')
    .isLength({ max: 20 })
    .withMessage('Ο τίτλος πρέπει να περιέχει λιγότερους από 20 χαρακτήρες'),
  body('pages')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Εισάγετε αριθμό σελίδων'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Εισάγετε περιγραφή'),
  body('genre').trim().isLength({ min: 1 }).withMessage('Εισάγετε είδος'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        data: req.body,
      });
    }
    try {
      let work = new Work({
        name: req.body.name,
        pages: req.body.pages,
        description: req.body.description,
        genre: req.body.genre,
      });
      await work.save();
      console.log('Work saved');
      res.status(200).json({ work });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error creating work in database: ' + err });
    }
  },
];
