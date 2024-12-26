import { getUserData } from "../utils/userlog.js";
import { createApplication } from "../utils/createApplication.js";
import { Markup, Scenes } from "telegraf";
import { bot } from '../bot.js';


export const reviewScene = new Scenes.BaseScene('REVIEW_APPLICATIONS_SCENE');

reviewScene.enter(async (context) => {
    await context.reply('Here is the most recent applications');

    const users = getUserData();

    for (const user of users) {
        const query = user.query;
        createApplication(user, query);
    }
});


// export const applicationCommand = async (context) => {
//     await context.reply('Here is the most recent applications');

//     const users = getUserData();

//     const answerKeyboard = Markup.inlineKeyboard([
//         Markup.button.callback('Answer', 'answer')
//     ]);

//     for (const user of users) {
//         const query = JSON.parse(user.query);
//         const text = query.text;
//         const media = query.media;

//         await context.reply(text, answerKeyboard);

//         // if (media) {
//         //     context.replyWithMediaGroup(media);
//         // }
//     }
// };