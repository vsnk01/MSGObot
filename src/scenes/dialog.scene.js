import { Markup, Scenes } from "telegraf";
import { bot } from '../bot.js';
import * as placeholder from '../api/placeholders.js';

export const dialogScene = new Scenes.BaseScene('DIALOG_SCENE');

const enterCustomDialog = async (context, userId, username) => {
    const admin = context.from.id;

    const customKeyboard = Markup.keyboard([
        ['End dialog']
    ]);

    await context.reply(`Your next messages will be sent directly to @${username}`, customKeyboard);
    await bot.telegram.sendMessage(userId, placeholder.joinChatText('MSGO'),  { reply_markup: {
        keyboard: [[{ text: placeholder.endChatButtonText }]],
        resize_keyboard: true,
    }});

    dialogScene.on('message', async (adminContext) => {
        console.log(userId);
        
        if (context.session.dialogActive) {
            if (adminContext.message.text === placeholder.endChatButtonText) {
                adminContext.session.dialogActive = false;
                await adminContext.reply('Dialog ended', Markup.removeKeyboard());
                await bot.telegram.sendMessage(userId, placeholder.leftChatText('MSGO'), Markup.removeKeyboard());
                adminContext.session = null;
                return adminContext.scene.leave();
            }

            await bot.telegram.sendMessage(userId, adminContext.message.text);
        }
    });

    bot.hears(/.*/, async (userContext) => {
        if (userContext.from.id === userId && context.session.dialogActive) {
            // if (userContext.message.text === 'End chat') {
            //     context.session.dialogActive = false;
            //     await  userContext.reply('Chat ended', Markup.removeKeyboard());
            //     await bot.telegram.sendMessage(admin, `@${userContext.from.username} left the chat`, Markup.removeKeyboard());
            //     userContext.session = null;
            //     return userContext.scene.leave();
            // }
            await bot.telegram.sendMessage(admin, `Message from: @${userContext.from.username}\n\n ${userContext.message.text}`);   
        }
    });
};

dialogScene.enter(async (context) => {
    const { userId, username } = context.scene.state;
    context.session.dialogActive = true;

    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(placeholder.approve2ButtonText, 'approve2')],
        [Markup.button.callback(placeholder.approve3ButtonText, 'approve3')],
        [Markup.button.callback(placeholder.waitButtonText, 'wait')],
        [Markup.button.callback(placeholder.rejectButtonText, 'requestExamples')],
        [Markup.button.callback(placeholder.requestButtonText, 'reject')],
        [Markup.button.callback(placeholder.warnButtonText, 'warn')],
        [Markup.button.callback(placeholder.customButtonText, 'sendCustom')],
    ]);

    dialogScene.action('sendCustom', async (context) => {
        await enterCustomDialog(context, userId);
    });

    dialogScene.action('approve2', async (context) => {
        await bot.telegram.sendMessage(userId, placeholder.approve2Text);
        await context.answerCbQuery();
        await enterCustomDialog(context, userId, username);
        // await context.scene.leave();
        // context.session = null;
    });

    dialogScene.action('approve3', async (context) => {
        await bot.telegram.sendMessage(userId, placeholder.approve3Text);
        await context.answerCbQuery();
        await enterCustomDialog(context, userId, username);
        // await context.scene.leave();
        // context.session = null;
    });

    dialogScene.action('wait', async (context) => {
        await bot.telegram.sendMessage(userId, placeholder.waitText);
        await context.answerCbQuery();
        await context.scene.leave();
        context.session = null;
    });

    dialogScene.action('requestExamples', async (context) => {
        await bot.telegram.sendMessage(userId, placeholder.requestExamplesText);
        await context.answerCbQuery();
        await enterCustomDialog(context, userId, username);
        // context.scene.leave();
        // context.session = null;
    });

    dialogScene.action('reject', async (context) => {
        const rejectKeyboard = Markup.inlineKeyboard([
            [Markup.button.callback(placeholder.noExamplesButtonText, 'noExamples')],
            [Markup.button.callback(placeholder.notRelevantButtonText, 'notRelevant')],
        ]);

        await context.answerCbQuery();
        await context.reply(`Choose the reason of rejection for ${username}`, rejectKeyboard);
    });

    dialogScene.action('noExamples', async (context) => {
        await bot.telegram.sendMessage(userId, placeholder.rejectExamplesText);
        await context.scene.leave();
        await context.answerCbQuery();
        context.session = null;
    });

    dialogScene.action('notRelevant', async (context) => {
        await bot.telegram.sendMessage(userId, placeholder.rejectRelevantText);
        await context.scene.leave();
        await context.answerCbQuery();
        context.session = null; 
    });

    dialogScene.action('warn', async (context) => {
        await bot.telegram.sendMessage(userId, placeholder.warnText);
        await context.scene.leave();
        await context.answerCbQuery();
        context.session = null;
    });

    await context.reply(`What do you want to say to ${username}`, keyboard);
});