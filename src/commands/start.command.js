import dotenv from 'dotenv';
import * as placeholder from '../api/placeholders.js';

dotenv.config();

export const startCommand = (async (context) => {
    // const userId = context.from.id;
    context.reply(placeholder.greetingsText(context.from.username), Markup.removeKeyboard());

    if (userId === parseInt(process.env.ADMINS)) {
        context.scene.enter('ADMIN_SCENE');
    } else {
        context.scene.enter('USER_SCENE');
    }
});