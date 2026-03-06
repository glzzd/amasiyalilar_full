const mongoose = require('mongoose');

const AboutWestAzerbaijanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Başlıq mütləqdir'],
    default: 'Qərbi Azərbaycan'
  },
  subtitle: {
    type: String,
    default: ''
  },
  photos: [{
    type: String
  }],
  overview: [{
    type: String
  }],
  stats: {
    historicalArea: { type: String, default: '' },
    regionsCount: { type: Number, default: 0 },
    keyRegions: [{ type: String }],
    culturalSites: { type: Number, default: 0 },
    languages: [{ type: String }],
    notableMonuments: [{ type: String }]
  },
  timeline: [{
    year: { type: String },
    event: { type: String }
  }],
  culture: {
    literature: [{ type: String }],
    music: [{ type: String }],
    architecture: [{ type: String }]
  },
  references: [{
    label: { type: String },
    url: { type: String }
  }]
}, {
  timestamps: true
});

// Singleton pattern - only one document allowed
AboutWestAzerbaijanSchema.statics.getSingleton = async function() {
  const doc = await this.findOne();
  if (doc) {
    return doc;
  }
  return await this.create({});
};

module.exports = mongoose.model('AboutWestAzerbaijan', AboutWestAzerbaijanSchema);
