import { bot } from './bot.js';
import express from 'express';
import https from 'https';
import { registerActions } from './registration/registration.js';

const app = express();
app.use(express.json());
app.use(bot.webhookCallback('/secret-path'));
const PORT = parseInt(process.env.PORT) || 3000;

const launchBot = async () => {
  try {
    registerActions();
    await bot.telegram.setWebhook(`https://${process.env.VERCEL_URL}/secret-path`);
    
    await bot.launch()
      .then(() => console.log('Bot launched successfully'))
      .catch((err) => console.error('Error launching bot:', err));

    console.log('Bot launched successfully');
  } catch (error) {
    console.error('Error launching bot:', error);
    // Retry after 5 seconds
    setTimeout(launchBot, 5000);
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  launchBot();
});


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

// bot.launch().then(() => {
//   bot.telegram.setWebhook(`https://${process.env.VERCEL_URL}/secret-path`);
//   console.log('Bot launched successfully');
// }).catch((err) => { console.error('Error launching bot:', err); });

app.use((err, req, res, next) => {
  console.error(err.stack); res.status(500).send('Something went wrong!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));