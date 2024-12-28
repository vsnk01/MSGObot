// Welcome

export const greetingsText = (username) =>`<b>Привет, ${username && '@' + username}!</b> 
Я бот сообщества MSGO Creation.`;

// Help placeholder

export const helpText = (role) =>
                        `<b>Список команд:</b>
                        
                        <i>/start - Меню</i>
                        <i>/help - Команды</i>

                        <b>Список функций:</b>

                        ${role === 'admin' ?
                        
                        `<b>Просмотр заявок<b> — вы можете просмотреть все заявки за определённый период и дать на них ответ
                       <b>Получение заявок в режиме реального времени<b> — успейте ответить на свежую заявку сразу!
                       <b>Рассылка<b> — отправка сообщения всем пользователям, подписаных на бота`

                        :

                        `<b>Подача заявки<b> — быстрый и лёгкий способ отправить заявку
                        Сопровождаеться сбором основных данных
                        <b>FAQ<b> — часто задаваемые вопросы</i>`

                        }
                        
                        <b>Есть вопросы? Свяжитесь с @fukuro_dz</b>`;

// Error placeholder

export const errorText = `Произошла ошибка. Попробуйте позже или обратитесь к администратору @fukuro_dz`;

// User scene placeholder

export const userSceneText = (username) => `Чем могу помочь, ${username && '@' +  username}?`;
export const applyButtonText = `Вакансии`;
export const partnershipButtonText = `Обращение`;
export const FAQButtonText = `FAQ`;

// Admin scene placeholder

export const adminSceneText = (username) => `Что прикажите делать, ${username && '@' + username}?`;
export const reviewButtonText = `Просмотреть недавние запросы`;

// Application example placeholder

export const applicationHeader = (username) => `<b>Новая заявка от ${username ? '@' + username : 'анонимного пользователя<b>'}\n\n`; 

// Apply for the team placeholder

export const joinTeamText = `<b>Хочешь присоединиться к команде? Тогда давай начнём!</b>

Чтобы вступить в нашу комнаду, тебе следует пройти 3 этапа: <i>подача заявки, тестовое задание и собеседование</i>.

После успешного прохождения всех этапов, ты станеть частью нашей команды!`;

export const thankYouText = `
Заявка была успешно отправлена!`;

// Applications placeholders

export const waitText = `Ожидайте, в скором времени вы получите ответ.`;

export const approve2Text = `Спасибо за ожидание, мы рассмотрели вашу анкету и готовы пригласить вас на второй этап вступления в команду!

Вам необходимо выполнить тестовое задание, чтобы перейти на финальный этап.

Дайте нам знать, если вы готовы взяться за это.`;

export const approve3Text = `Спасибо за ожидание!

Мы приглашаем вас на третий этап вступления в команду — собеседование.

Сообщите когда вам удобно будет связаться в дискорде.`;

export const requestExamplesText = `Здравствуйте! Пришлите примеры ваших работ.`;

export const rejectRelevantText = `К большому сожалению, мы вынуждены вам отказать.

Большое спасибо за выбор нашей студии, но на данный момент, мы не готовы принять вас в состав команды.

До скорых встреч!`;

export const rejectExamplesText = `Без примеров ваших работ мы не
можем рассмотреть вашу кандидатуру на вступление в команду.

Возвращайтесь когда пополните своё портфолио, мы будем ждать вас здесь!`;

export const warnText = `Сообщения в виде спама, рекламы или не по делу не будут рассматриваться!

Просим вас уважительно относится к поддержке и писать только по делу.

В противном случае, вы будете занесены в черный список.
Спасибо за понимание.`;

// FAQ text

export const aboutButtonText = `Кто мы такие?`;
export const toolsButtonText = `Как мы создаём сериалы?`; 
export const aboutBotButtonText = `Когда выйдет новое видео?`;

export const FAQText = `MSGO FAQ`;

export const toolsFAQText = `Для создания наших сериалов мы используем модификацию для Minecraft от McHorce, которая есть в свободном доступе.
Если вы хотите узнать, как же мы создаем анимацию персонажей, то ознакомьтесь с данной модификацией — https://www.youtube.com/c/McHorsesmods/videos`;

export const aboutFAQText = `MSGO Creation - cтудия по созданию Minecraft сериалов`;

export const aboutBotFAQText = `Новые видео выходят в зависимости от их готовности. Весь новый контент на канале выходит с предварительным анонсом в нашем телеграм канале`;

// Dialog scene placeholder

export const leftChatText = (username) => `${username ? username : 'Пользователь'} покинули чат.
Диалог завершён и ваши сообщения не будут отправлены.`;

export const joinChatText = (username) => `${username ? username : 'Пользователь'} присоединился к чату.
Следующие сообщения будут отправлены этому пользователю.`;

export const endDialogButtonText = `Закончить диалог`;

export const approve2ButtonText = `Подтвердить 2 этап`;
export const approve3ButtonText = `Подтвердить 3 этап`;
export const waitButtonText = `Ожидание`;
export const rejectButtonText = `Отказать указав причину`;
export const noExamplesButtonText = `Нет примеров`;
export const notRelevantButtonText = `Нет примеров`;
export const requestButtonText = `Запросить примеры`;
export const warnButtonText = `Предупреждение`;
export const customButtonText = `Кастомное сообщение`;
