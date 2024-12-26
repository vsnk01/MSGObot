import { bot } from './bot.js';
import express from 'express';
import { registerActions } from './registration/registration.js';

registerActions();

const app = express();
app.use(express.json());
app.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook(`https://${process.env.VERCEL_URL}/secret-path`);

app.get('/', (req, res) => { res.send('Bot is running!')});

const PORT = 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

bot.launch().then(() => {
  console.log('Bot launched successfully');
}).catch((err) => { console.error('Error launching bot:', err); });

app.use((err, req, res, next) => {
  console.error(err.stack); res.status(500).send('Something went wrong!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));