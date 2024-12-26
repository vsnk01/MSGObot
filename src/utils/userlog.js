import fs from 'fs';
const PATH = './src/data/applicants.json';

export const getUserData = () => {
    if (fs.existsSync(PATH)) {
        const rawData = fs.readFileSync(PATH, 'utf-8');

        if (rawData) {
            const data = JSON.parse(rawData);

            if (Array.isArray(data)) {
                return data;
            } else {
                return [ data ];
            }
        }
    }

    return [];
} 

export const saveUserData = (context, query, date) => {
    const users = getUserData();

    const userLog = {
        userId: context.from.id,
        username: context.from.username,
        query,
        date,
    };

    users.push(userLog);

    fs.writeFileSync(PATH, JSON.stringify(users, null, 2), 'utf-8');
}

