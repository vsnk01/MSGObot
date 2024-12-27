import { Scenes} from 'telegraf';
import { getUserData } from "../utils/userlog.js";
import { createApplication } from "../utils/createApplication.js";

export const reviewScene = new Scenes.BaseScene('REVIEW_APPLICATIONS_SCENE');

reviewScene.enter(async (context) => {
    await context.reply('Here is the most recent applications');

    const users = getUserData();

    for (const user of users) {
        const query = user.query;
        createApplication(user, query);
    }
});