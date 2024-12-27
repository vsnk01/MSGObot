import { Markup, Scenes } from "telegraf";
import { createTimer, proceed } from "../utils/timeout.js";
import * as placeholder from "../api/placeholders.js";

export const adminScene = new Scenes.BaseScene('ADMIN_SCENE');

adminScene.enter(async (context) => {
    context.session.timeout = createTimer(context);

    adminScene.action('review', proceed((context) => {
        try {
            context.answerCbQuery();
            context.scene.enter('REVIEW_APPLICATIONS_SCENE');
        } catch (error) {
            context.reply(`${placeholder.errorText}: ${error.message}`);
        }
    }));
        
    adminScene.action('news', proceed((context) => {
        context.answerCbQuery();
        context.reply(placeholder.errorText);
    }));

    const keyboard = Markup.inlineKeyboard([
                Markup.button.callback(placeholder.reviewButtonText, "review"),
                Markup.button.callback(placeholder.createNewsButtonText, "news"),
            ]).resize();

    await context.reply(placeholder.adminSceneText(context.from.username), keyboard);
});

adminScene.leave((context) => {
    if (context.session?.timeout) {
        clearTimeout(context.session.timeout);
    }
});