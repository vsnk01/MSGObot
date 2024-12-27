    import { Markup, Scenes } from "telegraf";
    import { createTimer, proceed } from "../utils/timeout.js";
    import * as placeholder from "../api/placeholders.js";
    
    export const userScene = new Scenes.BaseScene('USER_SCENE');
    
    userScene.enter(async (context) => {
        context.session.timeout = createTimer(context);
    
        userScene.action('apply', proceed((context) => {
            context.answerCbQuery();
            context.scene.enter("APPLICATION_SCENE")
        }));
        userScene.action('partnership', proceed((context) => {
            context.answerCbQuery();
            context.reply(placeholder.errorText)
        }));
        userScene.action('faq', proceed((context) => {
            context.answerCbQuery();
            context.scene.enter("FAQ_SCENE")
        }));
    
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback(placeholder.applyButtonText, "apply"),
            Markup.button.callback(placeholder.partnershipButtonText, "partnership"),
            Markup.button.callback(placeholder.FAQButtonText, "faq"),
        ]).resize();
        
        await context.reply(placeholder.userSceneText(context.from.username), keyboard);
    });