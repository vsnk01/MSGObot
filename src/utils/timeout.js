const TIMEOUT = 50000;

export const createTimer = (context) => setTimeout(() => {
    try {
        context.reply('Session has been closed due to inactivity');
        context.scene.leave();
    } catch (error) {
        console.log(error.message);
    }
}, TIMEOUT);

export const proceed =  (handler) => async(context) => {
    console.log(context.session.timeout);
    clearTimeout(context.session.timeout);
    await handler(context);
}