const mongoose = require('mongoose');
const slugify = require('slugify');

const martyrsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Ad və soyad tələb olunur'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  rank: {
    type: String,
    trim: true,
    default: ''
  },
  birthDate: {
    type: Date,
    required: [true, 'Doğum tarixi tələb olunur']
  },
  deathDate: {
    type: Date,
    required: [true, 'Şəhid olduğu tarix tələb olunur']
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  awards: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

martyrsSchema.pre('save', function(next) {
  if (!this.isModified('fullName')) return next();
  
  this.slug = slugify(this.fullName, {
    lower: true,
    strict: true,
    locale: 'tr'
  });
  next();
});

module.exports = mongoose.model('Martyrs', martyrsSchema);
