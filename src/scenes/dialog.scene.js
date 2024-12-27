import { Markup, Scenes } from "telegraf";
import { bot, ADMIN } from '../bot.js';
import * as placeholder from '../api/placeholders.js';

export const dialogScene = new Scenes.BaseScene('DIALOG_SCENE');

dialogScene.on('message', async (context) => {

    // console.log(context.session.adminId);
    // console.log(context.session.user.userId);


    if (context.session.dialogActive) {
        // if (context.from.id === context.session.user.userId) {
        //     await bot.telegram.sendMessage(context.session.adminId, context.message.text);
        // }

        if (context.from.id === context.session.adminId) {
            if (context.message.text === placeholder.endDialogButtonText) {
                await context.reply('Dialog ended', Markup.removeKeyboard());
                await bot.telegram.sendMessage(context.session.user.userId, placeholder.leftChatText('MSGO'));
                await context.scene.leave();
            }

            await bot.telegram.sendMessage(context.session.user.userId, context.message.text);
        }
    }
});
    // if (adminContext.from.id === context.session.adminId
    //     && context.session.dialogActive) {

    //     if (adminContext.message.text === placeholder.endChatButtonText) {
    //         adminContext.session.dialogActive = false;
    //         await adminContext.reply('Dialog ended', Markup.removeKeyboard());
    //         await bot.telegram.sendMessage(userId, placeholder.leftChatText('MSGO'));
    //         context.session = null;
    //         return context.scene.leave();
    //     }

    //     await bot.telegram.sendMessage(userId, adminContext.message.text);
    // }


const enterCustomDialog = async (context) => {
    context.session.adminId = context.from.id;

    const customKeyboard = Markup.keyboard([
        [placeholder.endDialogButtonText]
    ]);

    await context.reply(`Your next messages will be sent directly to @${context.session.user.username}`, customKeyboard);
    await bot.telegram.sendMessage(userId, placeholder.joinChatText('MSGO'));

    context.session.dialogActive = true;
    
    bot.hears(/.*/, async (userContext) => {
        if (userContext.from.id === context.session.user.userId
            && context.session.dialogActive) {
            await bot.telegram.sendMessage(context.session.adminId, `Message from: @${userContext.from.username}\n\n ${userContext.message.text}`);   
            // if (userContext.message.text === 'End chat') {
            //     context.session.dialogActive = false;
            //     await  userContext.reply('Chat ended', Markup.removeKeyboard());
            //     await bot.telegram.sendMessage(admin, `@${userContext.from.username} left the chat`, Markup.removeKeyboard());
            //     userContext.session = null;
            //     return userContext.scene.leave();
            // }
        }
    });
};

dialogScene.enter(async (context) => {
    const { userId, username } = context.scene.state;

    context.session.dialogActive = false;
    context.session.user = { userId, username };

    if (context.from.id === ADMIN) {
        const keyboard = Markup.inlineKeyboard([
            [Markup.button.callback(placeholder.approve2ButtonText, 'approve2')],
            [Markup.button.callback(placeholder.approve3ButtonText, 'approve3')],
            [Markup.button.callback(placeholder.waitButtonText, 'wait')],
            [Markup.button.callback(placeholder.rejectButtonText, 'requestExamples')],
            [Markup.button.callback(placeholder.requestButtonText, 'reject')],
            [Markup.button.callback(placeholder.warnButtonText, 'warn')],
            [Markup.button.callback(placeholder.customButtonText, 'sendCustom')],
        ]);
    
        await context.reply(`What do you want to say to ${username}`, keyboard);
    }
});

dialogScene.action('sendCustom', async (context) => {
    await enterCustomDialog(context);
});

dialogScene.action('approve2', async (context) => {
    // const { userId } = context.scene.state;
    await bot.telegram.sendMessage(context.session.user.userId, placeholder.approve2Text);
    await enterCustomDialog(context);
    // await context.answerCbQuery();
    // await context.scene.leave();
    // context.session = null;
});

dialogScene.action('approve3', async (context) => {
    const { userId } = context.scene.state;
    await bot.telegram.sendMessage(context.session.user.userId, placeholder.approve3Text);
    await enterCustomDialog(context);
    await context.answerCbQuery();
    // await context.scene.leave();
    // context.session = null;
});

dialogScene.action('wait', async (context) => {
    const { userId } = context.scene.state;
    await bot.telegram.sendMessage(context.session.user.userId, placeholder.waitText);
    await context.scene.leave();
    await context.answerCbQuery();
});

dialogScene.action('requestExamples', async (context) => {
    const { userId } = context.scene.state;
    await bot.telegram.sendMessage(context.session.user.userId, placeholder.requestExamplesText);
    await enterCustomDialog(context);
    await context.answerCbQuery();
    // context.scene.leave();
    // context.session = null;
});

dialogScene.action('reject', async (context) => {
    const { username } = context.scene.state;
    const rejectKeyboard = Markup.inlineKeyboard([
        [Markup.button.callback(placeholder.noExamplesButtonText, 'noExamples')],
        [Markup.button.callback(placeholder.notRelevantButtonText, 'notRelevant')],
    ]);

    await context.reply(`Choose the reason of rejection for ${username}`, rejectKeyboard);
    await context.answerCbQuery();
});

dialogScene.action('noExamples', async (context) => {
    const { userId } = context.scene.state;
    await bot.telegram.sendMessage(context.session.user.userId, placeholder.rejectExamplesText);
    await context.scene.leave();
    await context.answerCbQuery();
});

dialogScene.action('notRelevant', async (context) => {
    const { userId } = context.scene.state;
    await bot.telegram.sendMessage(context.session.user.userId, placeholder.rejectRelevantText);
    await context.scene.leave();
    await context.answerCbQuery();
});

dialogScene.action('warn', async (context) => {
    const { userId } = context.scene.state;
    await bot.telegram.sendMessage(context.session.user.userId, placeholder.warnText);
    await context.scene.leave();
    await context.answerCbQuery();
});

dialogScene.leave((context) => {
    context.session.dialogActive = false;
    context.session.userId = null;
    context.session.adminId = null;
});