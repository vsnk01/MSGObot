import { Markup, Scenes } from "telegraf";
import * as placeholder from '../api/placeholders.js';

export const faqScene = new Scenes.BaseScene("FAQ_SCENE");

faqScene.enter(async (context) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(placeholder.aboutButtonText, "about")],
        [Markup.button.callback(placeholder.toolsButtonText, "tools")],
        [Markup.button.callback(placeholder.aboutBotButtonText, "aboutBot")],
        [Markup.button.callback("Назад", "leave")]
    ]);

    await context.reply(placeholder.FAQButtonText, keyboard);
});


faqScene.action("about", async (context) => {
    await context.answerCbQuery();
    await context.reply(placeholder.aboutFAQText)
});

faqScene.action("tools", async (context) => {
    await context.answerCbQuery();
    await context.reply(placeholder.toolsFAQText)
});

faqScene.action("aboutBot", async (context) => {
    await context.answerCbQuery();
    await context.reply(placeholder.aboutBotFAQText)
});

faqScene.action("leave", async (context) => {
    await context.answerCbQuery();
    await context.scene.enter("USER_SCENE")
});