import { Scenes} from 'telegraf';
import { getUsersData } from "../utils/userlog.js";
import { createApplication } from "../utils/createApplication.js";

export const reviewScene = new Scenes.BaseScene('REVIEW_APPLICATIONS_SCENE');

reviewScene.enter(async (context) => {
    await context.reply('Here is the most recent applications');

    const users = await getUsersData();
    console.log(users);

    for (const user of users) {
        const query = user.query;
        await createApplication(user, query);
    }
});