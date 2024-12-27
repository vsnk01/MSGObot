import { Markup, Scenes } from "telegraf";
import { questions } from "../api/application.js";
import { saveUserData } from "../utils/userlog.js";
import { createTimer, proceed } from "../utils/timeout.js";
import { createApplication } from "../utils/createApplication.js";
import * as placeholder from "../api/placeholder.js";

export const applicationScene = new Scenes.BaseScene("APPLICATION_SCENE");

applicationScene.enter(async (context) => {
  context.replyWithPhoto('../img/title.png', { caption: placeholder.joinTeamText });
  context.session.timeout = createTimer(context);
  context.session.currentQuestion = 0;
  context.session.answers = [];
  context.session.answers[context.session.currentQuestion] = {
    question: await askQuestion(0, context),
    answer: '',
  }
});

const saveAnswer = async (context, answer) => {
  try {
    if (context.session.answers[context.session.currentQuestion].question.check) {
      try {
        context.session.answers[context.session.currentQuestion].question.check(answer);
      } catch (error) {
        throw new Error(`User sent the wrong data: ${error.message}`);
      }
    }

    context.session.answers[context.session.currentQuestion] = {
      ...context.session.answers[context.session.currentQuestion],
      answer,
    };

    context.session.currentQuestion++;

    if (context.session.currentQuestion < questions.length) {
      context.session.answers[context.session.currentQuestion] = {
        question: await askQuestion(context.session.currentQuestion, context),
        answer: '',
      };
    } else {
      await sendApplication(context.session.answers, context);
      await context.scene.leave();
    }
  } catch (error) {
    context.reply(`An error occured while asking a question: ${error.message}`);
  }
};

applicationScene.on('message', proceed(async (context) => {
  const answer = context.message.text;
  await saveAnswer(context, answer);
}));

applicationScene.on('callback_query', proceed(async (context) => {
  const answer = context.callbackQuery.data;
  await saveAnswer(context, answer);
  context.answerCbQuery();
  context.editMessageReplyMarkup();
}));

const askQuestion = async (currentQuestion, context) => {
  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion];

    if (question.options) {
      const keyboard = Markup.inlineKeyboard(
        question.options.map((option) => [Markup.button.callback(option, option)])
      );

      await context.reply(question.text, keyboard);
      console.log(question);
    } else {
      await context.reply(question.text);
    }

    return question;
  } else {
    throw new Error("The index of the questions doesn`t exist");
  }
};

const sendApplication = (answers, context) => {
  try {
    let textMessage = `New Application from @${context.from.username}\n\n`;

    answers.forEach((answer) => {
      textMessage +=
          `${answer.question.text}:\n  ${answer.answer}\n\n`;
    });

    saveUserData(context, textMessage, new Date());

    if (textMessage) {
      const user = { userId: context.from.id, username: context.from.username };
      createApplication(user, textMessage);
    }

    context.reply(placeholder.thankYouText);
  } catch(error) {
    context.reply(
      `Something went wrong during forming your application form. Please, try later ${error}`
    );
    console.log(error);
  }
};