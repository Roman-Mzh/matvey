import Clan from './clan.js';

class Royale {
  constructor() {
    this.clans = {};
  }
  async getClanData(tag) {
    const clan = this.clans[tag] || new Clan(tag);
    await clan.getRiverScore();
    this.clans[tag] = clan;
    return clan;
  }
}

export default Royale;