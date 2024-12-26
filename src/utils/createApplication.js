import { ADMIN } from '../bot.js';
import { Markup } from 'telegraf';
import { bot } from '../bot.js';

export const createApplication = async (user, text) => {
    const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('Answer', `answer_${user.userId}`)
    ]);

    console.log(user);
    
    await bot.telegram.sendMessage(ADMIN, text, keyboard);
    
    bot.action(`answer_${user.userId}`, (context) => {
        return context.scene.enter('DIALOG_SCENE', {
            userId: user.userId,
            username: user.username,
        });
    });
};

