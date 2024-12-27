export const roleOptions = [
    'Аниматор',
    'Саунд-дизайнер',
    'Композитор',
    'VFX-дизайнер',
    'Графический дизайнер',
    'Художник-иллюстратор',
    'Художник по скинам',
    'Моделлер',
    'Билдер',
    'Локализатор',
];

export const experienceOptions = [
    'Нет',
    'меньше 1 года',
    'до 3 лет',
    'больше 3 лет',
];

export const questions = [
            {
                id: 'role',
                text: 'Выберите вакансию',
                options: roleOptions
            },
            {
                id: 'experience',
                text: 'Был ли у вас опыт работы в данной профессии?',
                options: experienceOptions
            },
            {
                id: 'date',
                text: 'Дата рождения в формате хх/хх/хххх или  хх.хх.хххх',
                check: (date) => {
                    const UPPER_DATE_LIMIT  = new Date().getFullYear();
                    const BOTTOM_DATE_LIMIT = 1900;

                    const [day, month, year] = date.split(/[/.]/)
                    .map(num => Number(num.trim()));
                    
                    const parseDate = new Date(year, month - 1, day);
                                        
                    if (parseDate.getFullYear() !== year
                        || parseDate.getMonth() !== month - 1
                        || parseDate.getDate() !== day) {
                        throw new Error('Date should have format: xx.xx.xx');
                    }

                    if (parseDate.getFullYear() > UPPER_DATE_LIMIT
                        || parseDate.getFullYear() < BOTTOM_DATE_LIMIT) {
                        throw new Error('Your date either too bigger than current year or smaller than 1900');
                    }
                }
            },
            {
                id: 'personality',
                text: 'Какие ваши личные качества?',
            },
            {
                id: 'goal',
                text: 'Какая ваша основная цель в команде?',
            },
            {
                id: 'msgo',
                text: 'Почему вы выбрали именно MSGO Creation?',
            },
            {
                id: 'extra',
                text: 'Дополнительная информация',
            },
            {
                id: 'files',
                text: 'Примеры работ',
            },
];