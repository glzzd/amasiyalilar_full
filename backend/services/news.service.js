const News = require('../models/News');

const createNews = async (newsData) => {
  const news = await News.create(newsData);
  return news;
};

const getAllNews = async (query) => {
  const { page = 1, limit = 10, sort = '-createdAt', category, status, search, isConfirmed } = query;
  const skip = (page - 1) * limit;

  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (isConfirmed !== undefined) filter.isConfirmed = isConfirmed === 'true';
  
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }

  const newsList = await News.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
    
  const total = await News.countDocuments(filter);

  return {
    news: newsList,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit)
  };
};

const getNewsById = async (id) => {
  const news = await News.findById(id).populate('confirmedBy', 'name surname email');
  if (!news) {
    throw new Error('Xəbər tapılmadı');
  }
  // Increment views
  news.views += 1;
  await news.save();
  return news;
};

const getNewsBySlug = async (slug) => {
  const news = await News.findOne({ slug }).populate('confirmedBy', 'name surname email');
  if (!news) {
    throw new Error('Xəbər tapılmadı');
  }
  news.views += 1;
  await news.save();
  return news;
};

const updateNews = async (id, updateData) => {
  const news = await News.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
  if (!news) {
    throw new Error('Xəbər tapılmadı');
  }
  return news;
};

const deleteNews = async (id) => {
  const news = await News.findByIdAndDelete(id);
  if (!news) {
    throw new Error('Xəbər tapılmadı');
  }
  return news;
};

const changeStatus = async (id, status) => {
  const news = await News.findById(id);
  if (!news) {
    throw new Error('Xəbər tapılmadı');
  }
  news.status = status;
  await news.save();
  return news;
};

const confirmNews = async (id, userId) => {
  const news = await News.findById(id);
  if (!news) {
    throw new Error('Xəbər tapılmadı');
  }
  news.isConfirmed = true;
  news.confirmedBy = userId;
  news.status = 'active'; 
  await news.save();
  return news;
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  getNewsBySlug,
  updateNews,
  deleteNews,
  changeStatus,
  confirmNews
};
