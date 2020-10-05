require('dotenv').config();
import Bot from 'node-telegram-bot-api';
import('./botListeners');

const token = process.env.TG_TOKEN;

const motya = new Bot(token, {polling: true});

export default motya;