import { Markup, Scenes } from "telegraf";
import { bot } from '../bot.js';

export const dialogScene = new Scenes.BaseScene('DIALOG_SCENE');

dialogScene.enter(async (context) => {
    const { userId, username } = context.scene.state;
    context.session.dialogActive = true;

    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('Approve', 'approve')],
        [Markup.button.callback('Wait', 'wait')],
        [Markup.button.callback('Request examples', 'requestExamples')],
        [Markup.button.callback('Reject', 'reject')],
        [Markup.button.callback('Warn', 'warn')],
        [Markup.button.callback('Custom', 'sendCustom')],
    ]);

    dialogScene.action('sendCustom', async (context) => {
        const admin = context.from.id;
        const customKeyboard = Markup.keyboard([
            ['End dialog']
        ]);

        await context.reply(`Your next messages will be sent directly to @${username}`, customKeyboard);
        await bot.telegram.sendMessage(userId, 'MSGO member joined the chat',  { reply_markup: {
            keyboard: [[{ text: 'End chat' }]],
            resize_keyboard: true,
        }});

        bot.hears(/.*/, async (userContext) => {
            if (userContext.from.id === userId && context.session.dialogActive) {
                if (userContext.message.text === 'End chat') {
                    context.session.dialogActive = false;
                    await  userContext.reply('Chat ended', Markup.removeKeyboard());
                    await bot.telegram.sendMessage(admin, `@${userContext.from.username} left the chat`, Markup.removeKeyboard());
                    userContext.session = null;
                    return userContext.scene.leave();
                }
                
                await bot.telegram.sendMessage(admin, `Message from: @${userContext.from.username}\n\n ${userContext.message.text}`);   
            }
        });

        dialogScene.on('message', async (context) => {
            console.log(userId);
            if (context.session.dialogActive) {
                if (context.message.text === 'End dialog') {
                    context.session.dialogActive = false;
                    await context.reply('Dialog ended', Markup.removeKeyboard());
                    await bot.telegram.sendMessage(userId, 'MSGO left the chat', Markup.removeKeyboard());
                    context.session = null;
                    return context.scene.leave();
                }
    
                await bot.telegram.sendMessage(userId, context.message.text);
            }
        });
    });

    dialogScene.action('approve', async (context) => {
        await bot.telegram.sendMessage(userId, 'Approved');
        await context.answerCbQuery();
        await context.scene.leave();
        context.session = null;
    });

    dialogScene.action('wait', async (context) => {
        await bot.telegram.sendMessage(userId, 'Wait');
        await context.answerCbQuery();
        await context.scene.leave();
        context.session = null;
    });

    dialogScene.action('requestExamples', async (context) => {
        await bot.telegram.sendMessage(userId, 'Request examples');
        await context.answerCbQuery();
        context.scene.leave();
        context.session = null;
    });

    dialogScene.action('reject', async (context) => {
        const rejectKeyboard = Markup.inlineKeyboard([
            [Markup.button.callback('No examples', 'noExamples')],
            [Markup.button.callback('Not good enough', 'notRelevant')],
        ]);

        await context.reply(`Choose the reason of rejection for ${username}`, rejectKeyboard);

        dialogScene.action('noExamples', async (context) => {
            await bot.telegram.sendMessage(userId, 'No examples');
            await context.answerCbQuery();
            await context.scene.leave();
            context.session = null;
        });

        dialogScene.action('notRelevant', async (context) => {
            await bot.telegram.sendMessage(userId, 'Not relevant');
            await context.answerCbQuery();
            await context.scene.leave();
            context.session = null;
        });

        await context.answerCbQuery();
    });

    dialogScene.action('warn', async (context) => {
        await bot.telegram.sendMessage(userId, 'That is a warning');
        await context.answerCbQuery();
        await context.scene.leave();
        context.session = null;
    });

    await context.reply(`What do you want to say to ${username}`, keyboard);
});