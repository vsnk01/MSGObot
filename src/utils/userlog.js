// import fs from 'fs';
// import path from 'path';
import { redis } from '../kvClient.js';

// const FILEPATH = path.join(process.cwd(),'src/data/applicants.json');

export const getUsersData = async () => {
    const users = [];

    try {
        const keys = await redis.keys('applicant:*');
    
        for (const key of keys) {
            const value = await redis.get(key);
            users.push(JSON.parse(value));
        }

    } catch (error) {
        console.log(error.message); 
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

    try {
        const userLog = {
            userId: context.from.id,
            username: context.from.username,
            query,
            date,
        };
    
        await redis.set(`applicant:${userLog.userId}`, JSON.stringify(userLog));
    } catch (error) {
        console.log(error.message); 
    }

    // users.push(userLog);

    // fs.writeFileSync(FILEPATH, JSON.stringify(users, null, 2), 'utf-8');
}

