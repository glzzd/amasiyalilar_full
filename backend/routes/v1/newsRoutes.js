const express = require('express');
const newsController = require('../../controllers/news.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

// Protected routes
router.post('/', auth, newsController.createNews);
router.put('/:id', auth, newsController.updateNews);
router.delete('/:id', auth, newsController.deleteNews);
router.patch('/:id/status', auth, newsController.changeStatus);
router.patch('/:id/confirm', auth, newsController.confirmNews);

module.exports = router;
