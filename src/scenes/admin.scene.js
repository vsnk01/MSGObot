import { Markup, Scenes } from "telegraf";
import { createTimer, proceed } from "../utils/timeout.js";

export const adminScene = new Scenes.BaseScene('ADMIN_SCENE');

adminScene.enter(async (context) => {
    context.session.timeout = createTimer(context);

    adminScene.action('applications', proceed((context) => context.scene.enter('REVIEW_APPLICATIONS_SCENE')));
    adminScene.action('reply', proceed((context) => 
        context.reply('К сожалению, эта функция ещё не была добавлена или требует исправлений. Обратитесь к @fukuro_dz')));
    adminScene.action('news', proceed((context) => 
        context.reply('К сожалению, эта функция ещё не была добавлена или требует исправлений. Обратитесь к @fukuro_dz')));

    const keyboard = Markup.inlineKeyboard([
                Markup.button.callback("Просмотреть недавние запросы", "applications"),
                Markup.button.callback("Ответить на заявку", "reply"),
                Markup.button.callback("Создать рассылку", "news"),
            ]).resize();

    await context.reply(`Здравствуйте начальниха ${context.from.username}`, keyboard);
});