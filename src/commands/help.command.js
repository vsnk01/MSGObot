import * as placeholder from '../api/placeholders.js';
import { ADMIN } from '../bot.js';

export const helpCommand = (async (context) => {
    const role = context.from.id === ADMIN ? 'admin' : 'user';
    await context.reply(placeholder.helpText(role), { parse_mode:'Markdown' });
});