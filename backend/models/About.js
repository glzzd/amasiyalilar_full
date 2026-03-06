const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String }
});

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true }
});

const ctaSchema = new mongoose.Schema({
  text: { type: String },
  href: { type: String }
});

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Başlıq tələb olunur'],
    trim: true
  },
  desc: {
    type: String,
    required: [true, 'Açıqlama tələb olunur']
  },
  photos: [{
    type: String
  }],
  label: {
    type: String,
    default: 'HAQQIMIZDA'
  },
  bullets: [{
    type: String
  }],
  mission: {
    type: String
  },
  vision: {
    type: String
  },
  stats: [statSchema],
  team: [teamMemberSchema],
  cta: ctaSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Tek bir About kaydı olmasını sağlamak için Singleton benzeri bir yaklaşım
// Ancak Mongoose şema düzeyinde bunu zorlamak yerine service katmanında kontrol edeceğiz.

module.exports = mongoose.model('About', aboutSchema);
