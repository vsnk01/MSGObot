    import { Markup, Scenes } from "telegraf";
    import { createTimer, proceed } from "../utils/timeout.js";
    
    export const userScene = new Scenes.BaseScene('USER_SCENE');
    
    userScene.enter(async (context) => {
        context.session.timeout = createTimer(context);
    
        userScene.action('apply', proceed((context) => context.scene.enter("APPLICATION_SCENE")));
        userScene.action('partnership', proceed((context) =>
            context.reply('К сожалению, эта функция ещё не была добавлена или требует исправлений. Обратитесь к @fukuro_dz')));
        userScene.action('faq', proceed((context) =>
            context.reply('К сожалению, эта функция ещё не была добавлена или требует исправлений. Обратитесь к @fukuro_dz')));
    
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback("Вступление в команду", "apply"),
            Markup.button.callback("Партнёрство", "partnership"),
            Markup.button.callback("FAQ", "faq"),
        ]).resize();
        
        await context.replyWithPhoto('../img/title.png', `Приветсую ${context.from.username}! Чем могу помочь?`, keyboard);
    });