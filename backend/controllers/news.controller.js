const newsService = require('../services/news.service');

const createNews = async (req, res, next) => {
  try {
    const news = await newsService.createNews(req.body);
    res.status(201).json({
      success: true,
      message: 'Xəbər uğurla yaradıldı',
      data: news
    });
  } catch (error) {
    next(error);
  }
};

const getAllNews = async (req, res, next) => {
  try {
    const result = await newsService.getAllNews(req.query);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getNewsById = async (req, res, next) => {
  try {
    const news = await newsService.getNewsById(req.params.id);
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

const updateNews = async (req, res, next) => {
  try {
    const news = await newsService.updateNews(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Xəbər uğurla yeniləndi',
      data: news
    });
  } catch (error) {
    next(error);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    await newsService.deleteNews(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Xəbər uğurla silindi'
    });
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const news = await newsService.changeStatus(req.params.id, status);
    res.status(200).json({
      success: true,
      message: 'Status uğurla dəyişdirildi',
      data: news
    });
  } catch (error) {
    next(error);
  }
};

const confirmNews = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null; 
    const news = await newsService.confirmNews(req.params.id, userId);
    res.status(200).json({
      success: true,
      message: 'Xəbər təsdiqləndi',
      data: news
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  changeStatus,
  confirmNews
};
