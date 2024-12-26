import { bot } from './bot.js';
import express from 'express';
import { registerActions } from './registration/registration.js';

// const app = express();
// const PORT = parseInt(process.env.PORT) || 3000;

import { bot } from './bot.js';
import { registerActions } from './registration/registration.js';

registerActions();

const SECRET_PATH = '/api/webhook';
const WEBHOOK_URL = `https://${process.env.VERCEL_URL}${SECRET_PATH}`;

if (process.env.VERCEL_URL) {
  bot.telegram.setWebhook(WEBHOOK_URL)
    .then(() => console.log('Webhook set:', WEBHOOK_URL))
    .catch(console.error);
}

// bot
// 	.launch({ webhook: { domain: process.env.VERCEL_URL, port: PORT } })
// 	.then(() => console.log("Webhook bot listening on port", PORT));
// app.use(express.json());

// registerActions();

// bot
//     .launch({ webhook: { domain: process.env.VERCEL_URL, port: PORT } })
//     .then(() => console.log("Webhook bot listening on port", PORT))
//     .catch((error) => {
//         console.error('Error launching bot:', error);
//         process.exit(1);
//     });

// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

// app.listen(PORT, () => console.log("Express server listening on port", PORT));

// app.get('/', (req, res) => {
//   res.send('Bot server is running');
// });

// app.use((req, res) => {
//   res.status(404).send('Not Found');
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });


// const launchBot = async () => {
//   try {
//     registerActions();
//     await bot.telegram.setWebhook(`https://${process.env.VERCEL_URL}/secret-path`);
//     await bot.launch();

//     console.log('Bot launched successfully');
//   } catch (error) {
//     console.error('Error launching bot:', error);
//     // Retry after 5 seconds
//     setTimeout(launchBot, 5000);
//   }
// };

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   launchBot();
// });


// app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

// bot.launch().then(() => {
//   bot.telegram.setWebhook(`https://${process.env.VERCEL_URL}/secret-path`);
//   console.log('Bot launched successfully');
// }).catch((err) => { console.error('Error launching bot:', err); });

// app.use((err, req, res, next) => {
//   console.error(err.stack); res.status(500).send('Something went wrong!');
// });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));