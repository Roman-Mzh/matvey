import api from './api.js';

class Clan {
  constructor(tag) {
    this.tag = tag;
    this.lastUpdate = this.lastUpdate || new Date();
  }

  async getRiverScore() {
    try {
      if (!this.riverData || (this.riverData && (new Date() - this.lastUpdate) > 60000)) {
        const { data } = await api.get(`/clans/%23${this.tag}/riverracelog`);
        const { lastWarSorted, lastWarId } = this.processRace(data);
        this.riverData = lastWarSorted;
        this.lastWarId = lastWarId;
        this.lastUpdate = new Date();
      }
    } catch (e) {
      console.log(e);
    }
    const { riverData, lastUpdate } = this;

    return { riverData, lastUpdate };
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
    const wars = Object.entries(processed);
    const lastWar = wars[wars.length - 1];
    const lastWarId = lastWar[0];
    const lastWarSorted = Object.values(lastWar[1])
      .sort((a,b) => (b.fame + b.repairPoints) - (a.fame + a.repairPoints));
    return {
      lastWarSorted, lastWarId
    };
  }
}

export default Clan;