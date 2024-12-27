import { Markup, Scenes } from "telegraf";
import { bot } from '../bot.js';
import * as placeholder from '../api/placeholders.js';

export const dialogScene = new Scenes.BaseScene('DIALOG_SCENE');

const enterCustomDialog = async (context, userId, username) => {
    const admin = context.from.id;

    const customKeyboard = Markup.keyboard([
        [placeholder.endDialogButtonText]
    ]);

    await context.reply(`Your next messages will be sent directly to @${username}`, customKeyboard);
    
    await bot.telegram.sendMessage(userId, placeholder.joinChatText('MSGO'));

    dialogScene.on('message', async (adminContext) => {
        console.log(userId);
        
        if (adminContext.from.id === admin && context.session.dialogActive) {

            if (adminContext.message.text === placeholder.endChatButtonText) {
                adminContext.session.dialogActive = false;
                await adminContext.reply('Dialog ended', Markup.removeKeyboard());
                await bot.telegram.sendMessage(userId, placeholder.leftChatText('MSGO'));
                context.session = null;
                return context.scene.leave();
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

    dialogScene.action('sendCustom', async (contextСustom) => {
        await enterCustomDialog(context, userId);
    });

    dialogScene.action('approve2', async (contextApprove2) => {
        await bot.telegram.sendMessage(userId, placeholder.approve2Text);
        await contextApprove2.answerCbQuery();
        await enterCustomDialog(context, userId, username);
        // await context.scene.leave();
        // context.session = null;
    });

    dialogScene.action('approve3', async (contextApprove3) => {
        await bot.telegram.sendMessage(userId, placeholder.approve3Text);
        await contextApprove3.answerCbQuery();
        await enterCustomDialog(context, userId, username);
        // await context.scene.leave();
        // context.session = null;
    });

    dialogScene.action('wait', async (contextWait) => {
        await bot.telegram.sendMessage(userId, placeholder.waitText);
        await contextWait.answerCbQuery();
        await context.scene.leave();
        context.session = null;
    });

    dialogScene.action('requestExamples', async (contextRequest) => {
        await bot.telegram.sendMessage(userId, placeholder.requestExamplesText);
        await contextRequest.answerCbQuery();
        await enterCustomDialog(context, userId, username);
        // context.scene.leave();
        // context.session = null;
    });

    dialogScene.action('reject', async (contextReject) => {
        const rejectKeyboard = Markup.inlineKeyboard([
            [Markup.button.callback(placeholder.noExamplesButtonText, 'noExamples')],
            [Markup.button.callback(placeholder.notRelevantButtonText, 'notRelevant')],
        ]);

        await contextReject.answerCbQuery();
        await contextReject.reply(`Choose the reason of rejection for ${username}`, rejectKeyboard);
    });

    dialogScene.action('noExamples', async (contextExamples) => {
        await bot.telegram.sendMessage(userId, placeholder.rejectExamplesText);
        await contextExamples.answerCbQuery();
        await context.scene.leave();
        context.session = null;
    });

    dialogScene.action('notRelevant', async (contextRelevant) => {
        await bot.telegram.sendMessage(userId, placeholder.rejectRelevantText);
        await contextRelevant.answerCbQuery();
        await context.scene.leave();
        context.session = null; 
    });

    dialogScene.action('warn', async (contextWarn) => {
        await bot.telegram.sendMessage(userId, placeholder.warnText);
        await contextWarn.answerCbQuery();
        await context.scene.leave();
        context.session = null;
    });

    await context.reply(`What do you want to say to ${username}`, keyboard);
});