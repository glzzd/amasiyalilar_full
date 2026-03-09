const Martyrs = require('../models/Martyrs');

const createMartyr = async (data) => {
  const martyr = await Martyrs.create(data);
  return martyr;
};

const getAllMartyrs = async (query) => {
  const { page = 1, limit = 10, sort = '-createdAt', search } = query;
  const skip = (page - 1) * limit;

  const filter = {};
  
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { rank: { $regex: search, $options: 'i' } }
    ];
  }

  const martyrsList = await Martyrs.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
    
  const total = await Martyrs.countDocuments(filter);

  return {
    martyrs: martyrsList,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit)
  };
};

const getMartyrById = async (id) => {
  const martyr = await Martyrs.findById(id);
  if (!martyr) {
    throw new Error('Şəhid haqqında məlumat tapılmadı');
  }
  return martyr;
};

const getMartyrBySlug = async (slug) => {
  const martyr = await Martyrs.findOne({ slug });
  if (!martyr) {
    throw new Error('Şəhid haqqında məlumat tapılmadı');
  }
  return martyr;
};

const updateMartyr = async (id, updateData) => {
  const martyr = await Martyrs.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
  if (!martyr) {
    throw new Error('Şəhid haqqında məlumat tapılmadı');
  }
  return martyr;
};

const deleteMartyr = async (id) => {
  const martyr = await Martyrs.findByIdAndDelete(id);
  if (!martyr) {
    throw new Error('Şəhid haqqında məlumat tapılmadı');
  }
  return martyr;
};

module.exports = {
  createMartyr,
  getAllMartyrs,
  getMartyrById,
  getMartyrBySlug,
  updateMartyr,
  deleteMartyr
};
