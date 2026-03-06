const AboutWestAzerbaijan = require('../models/AboutWestAzerbaijan');

class AboutWestAzerbaijanService {
  async getAbout() {
    return await AboutWestAzerbaijan.getSingleton();
  }

  async createOrUpdateAbout(data) {
    const about = await AboutWestAzerbaijan.getSingleton();
    
    // Update fields
    if (data.title) about.title = data.title;
    if (data.subtitle) about.subtitle = data.subtitle;
    if (data.photos) about.photos = data.photos;
    if (data.overview) about.overview = data.overview;
    
    // Update stats
    if (data.stats) {
      if (data.stats.historicalArea) about.stats.historicalArea = data.stats.historicalArea;
      if (data.stats.regionsCount !== undefined) about.stats.regionsCount = data.stats.regionsCount;
      if (data.stats.keyRegions) about.stats.keyRegions = data.stats.keyRegions;
      if (data.stats.culturalSites !== undefined) about.stats.culturalSites = data.stats.culturalSites;
      if (data.stats.languages) about.stats.languages = data.stats.languages;
      if (data.stats.notableMonuments) about.stats.notableMonuments = data.stats.notableMonuments;
    }

    // Update timeline
    if (data.timeline) about.timeline = data.timeline;

    // Update culture
    if (data.culture) {
      if (data.culture.literature) about.culture.literature = data.culture.literature;
      if (data.culture.music) about.culture.music = data.culture.music;
      if (data.culture.architecture) about.culture.architecture = data.culture.architecture;
    }

    // Update references
    if (data.references) about.references = data.references;

    await about.save();
    return about;
  }
}

module.exports = new AboutWestAzerbaijanService();
