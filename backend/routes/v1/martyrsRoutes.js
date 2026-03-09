const express = require('express');
const martyrsController = require('../../controllers/martyrs.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', martyrsController.getAllMartyrs);
router.get('/:id', martyrsController.getMartyrById);
router.get('/slug/:slug', martyrsController.getMartyrBySlug);

// Protected routes
router.post('/', auth, martyrsController.createMartyr);
router.put('/:id', auth, martyrsController.updateMartyr);
router.delete('/:id', auth, martyrsController.deleteMartyr);

module.exports = router;
