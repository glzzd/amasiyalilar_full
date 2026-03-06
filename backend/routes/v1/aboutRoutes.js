const express = require('express');
const aboutController = require('../../controllers/about.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', aboutController.getAbout);

// Protected routes
router.post('/', auth, aboutController.createOrUpdateAbout);
router.put('/', auth, aboutController.createOrUpdateAbout); // PUT da aynı işlevi görsün

module.exports = router;
