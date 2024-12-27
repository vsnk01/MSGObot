import dotenv from 'dotenv';
import * as placeholder from '../api/placeholders.js';
import * as images from '../img/image.links.js';

dotenv.config();

export const startCommand = (async (context) => {
    const userId = context.from.id;

    await context.replyWithPhoto(images.avatarImage,
        {
            caption: placeholder.greetingsText(context.from.username),
            parse_mode: 'HTML'
        });

    if (userId === parseInt(process.env.ADMINS)) {
        context.scene.enter('ADMIN_SCENE');
    } else {
        context.scene.enter('USER_SCENE');
    }
});