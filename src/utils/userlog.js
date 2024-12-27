// import fs from 'fs';
// import path from 'path';
import { redis } from './kvClient.js';

// const FILEPATH = path.join(process.cwd(),'src/data/applicants.json');

export const getUsersData = async () => {
    const keys = redis.keys('applicant:*');

    const data = [];

    for (const key of keys) {
        const value = await redis.get(key);
        data.push({ key, value });
    }

    // if (fs.existsSync(FILEPATH)) {
    //     const rawData = fs.readFileSync(FILEPATH, 'utf-8');

    //     if (rawData) {
    //         const data = JSON.parse(rawData);

    //         if (Array.isArray(data)) {
    //             return data;
    //         } else {
    //             return [ data ];
    //         }
    //     }
    // }

    return data;
} 

export const saveUserData = async (context, query, date) => {
    // const users = getUserData();

    const userLog = {
        userId: context.from.id,
        username: context.from.username,
        query,
        date,
    };

    await redis.set(`applicant:${userLog.userId}`, JSON.stringify(userLog));

    // users.push(userLog);

    // fs.writeFileSync(FILEPATH, JSON.stringify(users, null, 2), 'utf-8');
}

