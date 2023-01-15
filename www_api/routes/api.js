const express = require('express');
const router = express.Router();
const passport = require('passport');

const auth_Controller = require('../controllers/authController');
const work_Controller = require('../controllers/workController');
const bio_Controller = require('../controllers/biographyController');
const ref_Controller = require('../controllers/referenceController');
//Auth routes

router.post('/login', auth_Controller.login);

router.post('/register', auth_Controller.register);

router.post('/logout');

router.get('/works', work_Controller.allWorks);
router.get('/bio', bio_Controller.allBiographies);
router.get('/ref', ref_Controller.allReferences);

router.put(
  '/works/:workid/update',
  passport.authenticate('jwt', { session: false }),
  work_Controller.updateWork
);
router.put(
  '/bio/:bioid/update',
  passport.authenticate('jwt', { session: false }),
  bio_Controller.updateBiography
);
router.put(
  '/ref/:refid/update',
  passport.authenticate('jwt', { session: false }),
  ref_Controller.updateReference
);

router.delete(
  '/works/:workid',
  passport.authenticate('jwt', { session: false }),
  work_Controller.deleteWork
);
router.delete(
  '/bio/:bioid',
  passport.authenticate('jwt', { session: false }),
  bio_Controller.deleteBiography
);
router.delete(
  '/ref/:refid',
  passport.authenticate('jwt', { session: false }),
  ref_Controller.deleteReference
);

router.post(
  '/works',
  passport.authenticate('jwt', { session: false }),
  work_Controller.createWork
);
router.post(
  '/bio',
  passport.authenticate('jwt', { session: false }),
  bio_Controller.createBiography
);
router.post(
  '/ref',
  passport.authenticate('jwt', { session: false }),
  ref_Controller.createReference
);

module.exports = router;
