import { Markup, Scenes } from "telegraf";
import { createTimer, proceed } from "../utils/timeout.js";
import * as placeholder from "../api/placeholders.js";

export const adminScene = new Scenes.BaseScene('ADMIN_SCENE');

adminScene.action('review', proceed(async (context) => {
    await context.answerCbQuery();
    await context.scene.enter("REVIEW_APPLICATIONS_SCENE");
}));

adminScene.enter(async (context) => {
    context.session.timeout = createTimer(context);

    const keyboard = Markup.inlineKeyboard([
        Markup.button.callback(placeholder.reviewButtonText, "review")
    ]);

    await context.reply(placeholder.adminSceneText(context.from.username), keyboard);
});

adminScene.leave((context) => {
    if (context.session?.timeout) {
        clearTimeout(context.session.timeout);
    }
});