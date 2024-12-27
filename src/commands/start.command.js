import dotenv from 'dotenv';
import * as placeholder from '../api/placeholders.js';
import { Markup } from 'telegraf';

dotenv.config();

export const startCommand = (async (context) => {
    const userId = context.from.id;
    const photoPath = 'https://msgo-bot.vercel.app/title.png';

    try {
        await context.replyWithPhoto(photoPath, { caption: 'test image' });
    } catch (error) {
        console.log(error.message);
    }
    
    await context.reply(placeholder.greetingsText(context.from.username), Markup.removeKeyboard());

    if (userId === parseInt(process.env.ADMINS)) {
        context.scene.enter('ADMIN_SCENE');
    } else {
        context.scene.enter('USER_SCENE');
    }
});