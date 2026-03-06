const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const upload = require('../../middlewares/upload');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Upload single file
// Protected route - only authenticated users can upload
router.post('/', auth, upload.single('file'), uploadController.uploadFile);

module.exports = router;
