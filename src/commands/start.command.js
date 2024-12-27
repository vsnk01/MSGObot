import dotenv from 'dotenv';

dotenv.config();

export const startCommand = (async (context) => {
    const userId = context.from.id;

    if (userId === parseInt(process.env.ADMINS)) {
        context.scene.enter('ADMIN_SCENE');
    } else {
        context.scene.enter('USER_SCENE');
    }
});