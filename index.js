import Royale from './src/royale.js';
import Bot from 'node-telegram-bot-api';

const token = process.env.TG_TOKEN;
const medalki = ['🥇','🥈','🥉'];

const motya = new Bot(token, {polling: true});
const royale = new Royale();

motya.onText(/\/poehali ([\d\w]*)\s?(\d*)/, async ({ chat: { id } }, match) => {
  const tag = match[1];
  const numberOfParticipants = match[2];
  try {
    const lastWarParticipants = await royale.getRiverScore(tag);
    const formattedParticipants = lastWarParticipants
      .slice(0, Math.max(numberOfParticipants, 1) ||10)
      .map((p, i) => `${medalki[i] || ''} ${p.name} : ${p.fame} ${p.repairPoints}`);
    motya.sendMessage(id, '<pre>Наши герои: \n' + formattedParticipants.join('\n') + '</pre>', { parse_mode: 'HTML' });
  } catch (e) {
  }
})