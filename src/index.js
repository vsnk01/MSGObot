import { bot } from './bot.js';
import express from 'express';
// import { startCommand } from './commands/start.command.js';
// import { helpCommand } from './commands/help.command.js';
import { registerActions } from './registration/registration.js';

registerActions();

const app = express();
app.use(express.json());
app.use(bot.webhookCallback('/secret-path')); // Настройка webhook
bot.telegram.setWebhook(`https://${process.env.VERCEL_URL}/secret-path`); // Запуск сервера const

const PORT = 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

bot.launch().then(() => {
  console.log('Bot launched successfully');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));