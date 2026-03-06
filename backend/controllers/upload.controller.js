const path = require('path');

const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Fayl yüklənmədi'
      });
    }

    // Construct public URL
    // Assuming server serves 'public/uploads' at '/uploads'
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      url: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile
};
