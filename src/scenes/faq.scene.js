import { Markup, Scenes } from "telegraf";
import * as placeholder from '../api/placeholders.js';

export const faqScene = new Scenes.BaseScene("FAQ_SCENE");

faqScene.enter(async (context) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback("Про МСГО", "about")],
        [Markup.button.callback("Про инструментарий", "tools")],
        [Markup.button.callback("Про бота", "aboutBot")],
        [Markup.button.callback("Назад", "leave")]
    ]);

    context.reply(placeholder.FAQText, keyboard);
});


faqScene.action("about", async (context) => context.reply(placeholder.aboutFAQText));
faqScene.action("tools", async (context) => context.reply(placeholder.toolsFAQText));
faqScene.action("aboutBot", async (context) => context.reply(placeholder.aboutBotFAQText));
faqScene.action("leave", async (context) => context.enter("USER_SCENE"));