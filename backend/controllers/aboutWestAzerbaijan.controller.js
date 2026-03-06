const aboutService = require('../services/aboutWestAzerbaijan.service');

const getAbout = async (req, res, next) => {
  try {
    const about = await aboutService.getAbout();
    res.status(200).json({
      success: true,
      data: about
    });
  } catch (error) {
    next(error);
  }
};

const createOrUpdateAbout = async (req, res, next) => {
  try {
    const about = await aboutService.createOrUpdateAbout(req.body);
    res.status(200).json({
      success: true,
      message: 'Qərbi Azərbaycan məlumatları uğurla yeniləndi',
      data: about
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAbout,
  createOrUpdateAbout
};
