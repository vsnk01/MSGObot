import { bot } from './bot.js';
import express from 'express';
import { token } from './connections/token.connection.js';
import { registerActions } from './registration/registration.js';

registerActions();

console.log('done');

const SECRET_PATH = `/${token}`;
// eslint-disable-next-line no-undef
const WEBHOOK_URL = `https://${process.env.VERCEL_URL}${SECRET_PATH}`;

const app = express();
app.use(express.json());

app.post(SECRET_PATH, (req, res) => {
  bot.handleUpdate(req.body)
    .then(() => res.status(200).json({ ok: true }))
    .catch((error) => {
      console.error('Ошибка обработки обновления:', error);
      res.status(500).json({ error: 'Ошибка обработки обновления' });
    });
});

app.get('/', (req, res) => {
  res.status(200).send('Бот работает через вебхук!');
});

if (process.env.VERCEL_URL) {
  bot.telegram.setWebhook(WEBHOOK_URL)
    .then(() => console.log('Webhook set:', WEBHOOK_URL))
    .catch(console.error);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));