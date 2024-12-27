import { redis } from '../kvClient.js';

export const getUsersData = async () => {
    const users = [];

    try {
        const keys = await redis.keys('applicant:*');
        console.log(keys);
    
        for (const key of keys) {
            const value = await redis.get(key);
            console.log(value);

            if (value) {
                users.push(value);
            }
        }

    } catch (error) {
        console.log(error.message); 
    }

    return users;
} 

export const saveUserData = async (context, query, date) => {
    try {
        const userLog = {
            userId: context.from.id,
            username: context.from.username,
            query,
            date,
        };

        if (redis.get(`applicant:${userLog.userId}`)) {
            redis.del(`applicant:${userLog.userId}`);
        }
    
        await redis.set(`applicant:${userLog.userId}`, JSON.stringify(userLog));
        console.log('User data saved');
        console.log(redis.get(`applicant:${userLog.userId}`));
    } catch (error) {
        console.log(error.message); 
    }
}

