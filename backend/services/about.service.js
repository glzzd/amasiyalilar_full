const About = require('../models/About');

// Tek bir about kaydı olmalı, varsa getir, yoksa oluştur
const getAbout = async () => {
  let about = await About.findOne();
  if (!about) {
    // Varsayılan boş bir kayıt oluşturabiliriz veya null dönebiliriz.
    // Kullanıcı ilk kez oluşturacaksa null dönmesi daha mantıklı olabilir
    // ama frontend'in her zaman bir veri beklemesi durumunda default oluşturmak iyidir.
    // Şimdilik null dönelim, create/update ile yönetilsin.
    return null;
  }
  return about;
};

const createOrUpdateAbout = async (data) => {
  let about = await About.findOne();
  
  if (about) {
    // Varsa güncelle
    about = await About.findByIdAndUpdate(about._id, data, {
      new: true,
      runValidators: true
    });
  } else {
    // Yoksa oluştur
    about = await About.create(data);
  }
  
  return about;
};

module.exports = {
  getAbout,
  createOrUpdateAbout
};
