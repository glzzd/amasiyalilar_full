const express = require('express');
const aboutWestAzerbaijanController = require('../../controllers/aboutWestAzerbaijan.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', aboutWestAzerbaijanController.getAbout);

// Protected routes
router.post('/', auth, aboutWestAzerbaijanController.createOrUpdateAbout);
router.put('/', auth, aboutWestAzerbaijanController.createOrUpdateAbout);

module.exports = router;
