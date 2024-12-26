import { bot } from './bot.js';
// import { startCommand } from './commands/start.command.js';
// import { helpCommand } from './commands/help.command.js';
import { registerActions } from './registration/registration.js';

registerActions();

bot.launch().then(() => {
  console.log('Bot launched successfully');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));