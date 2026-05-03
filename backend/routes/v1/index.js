const express = require('express');
const authRoutes = require('./authRoutes.js');
const newsRoutes = require('./newsRoutes.js');
const aboutRoutes = require('./aboutRoutes.js');
const uploadRoutes = require('./uploadRoutes.js');
const aboutWestAzerbaijanRoutes = require('./aboutWestAzerbaijanRoutes.js');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/about', aboutRoutes);
router.use('/upload', uploadRoutes);
router.use('/about-west-azerbaijan', aboutWestAzerbaijanRoutes);

module.exports = router;
