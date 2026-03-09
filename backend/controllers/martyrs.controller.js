const martyrsService = require('../services/martyrs.service');

const createMartyr = async (req, res, next) => {
  try {
    const martyr = await martyrsService.createMartyr(req.body);
    res.status(201).json({
      success: true,
      message: 'Şəhid məlumatı uğurla yaradıldı',
      data: martyr
    });
  } catch (error) {
    next(error);
  }
};

const getAllMartyrs = async (req, res, next) => {
  try {
    const result = await martyrsService.getAllMartyrs(req.query);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getMartyrById = async (req, res, next) => {
  try {
    const martyr = await martyrsService.getMartyrById(req.params.id);
    res.status(200).json({
      success: true,
      data: martyr
    });
  } catch (error) {
    next(error);
  }
};

const getMartyrBySlug = async (req, res, next) => {
  try {
    const martyr = await martyrsService.getMartyrBySlug(req.params.slug);
    res.status(200).json({
      success: true,
      data: martyr
    });
  } catch (error) {
    next(error);
  }
};

const updateMartyr = async (req, res, next) => {
  try {
    const martyr = await martyrsService.updateMartyr(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Şəhid məlumatı uğurla yeniləndi',
      data: martyr
    });
  } catch (error) {
    next(error);
  }
};

const deleteMartyr = async (req, res, next) => {
  try {
    await martyrsService.deleteMartyr(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Şəhid məlumatı uğurla silindi'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMartyr,
  getAllMartyrs,
  getMartyrById,
  getMartyrBySlug,
  updateMartyr,
  deleteMartyr
};
