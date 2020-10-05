import api from './api.js';

class Clan {
  constructor(tag) {
    this.tag = tag;
    this.lastUpdate = new Date();
  }

  async getRiverScore() {
    if (this.riverData && (new Date() - this.lastUpdate) < 60000) return this.riverData; // update each clan once in a minute

    try {
      const { data } = await api.get(`/clans/%23${this.tag}/riverracelog`);
      this.riverData = this.processRace(data);
      this.lastUpdate = new Date();
      return this.riverData;
    } catch (e) {
      console.log(e);
    }
  }

  processRace({ items }) {
    const processed = items.reduce((res, cur) => {
      const { seasonId, standings } = cur;
      const { clan: { participants } } = standings.find(s => s.clan.tag === `#${this.tag}`);
      res[seasonId] = res[seasonId] || {};
      participants.forEach(part => {
        res[seasonId][part.tag] = {
          ...part,
          fame: (res[seasonId][part.tag] || { fame: 0 }).fame + part.fame,
          repairPoints: (res[seasonId][part.tag] || { repairPoints: 0 }).repairPoints + part.repairPoints
        };
      });
      return res;
    }, {});
    const wars = Object.values(processed);
    const lastWar = wars[wars.length - 1];
    return Object.values(lastWar)
      .sort((a,b) => (b.fame + b.repairPoints) - (a.fame + a.repairPoints));
  }
}

export default Clan;