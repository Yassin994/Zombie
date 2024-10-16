const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFqWmYxZ1lZdUNvOFVVb1kydzZPQWVuem9zSngxVTNPMFZaeFRZVy8zcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQThiSkRTT3BWU2thcjhIM2J4bFpscStlZy9KWmhibHpVbm9MRjJyM21CRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTDhjN3psL1dnc01FbWVOVzRZRk0yYnRVRDE2SER0eW5tQmIvWFVYajBjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUU2cwbWozTFl3VU9oZHZhMW1qRDZLSnBjeTN1eXgyYXNIS2QwYTFjMXlvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldCWHY4azN4ZTB5QlllcE9rQnlDOFBqa1FUbEkxTzJrbzg0andNMjErMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZHcERwaks4WEM5MDdKTzJnODA0ajFpbC93MkNLNXpWbHFkMUVDa3FEelE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0VBRFNhTFFiR3cycGh0UXRFdUFSUzJIUlZIUmk5RUQwZnhWZGNqb1AxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnVXNUJyTjlzSk5vQ2paUkI1M0h4RTkzZ1BuU2RIYUk5MENvaC9HSVprWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImgxVkpwSnIweVVJZWEvM25LSm1nYVdvQ2xGOGZHV0xVeUdNWmo4UEtqZlJ2VFVvb0QwbEw2UkxWMkZkWmVTZE1PVVFYNmZhbjFrODdtbUpmbjdPSUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODIsImFkdlNlY3JldEtleSI6ImFlUHVjQ205QXNRL0g5dnRMWlNyNnQ4b0tZWEw4YVRBdUlwdWFNQ2JoelE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjlwUjlyQUp2VDd5TG1IcjM3SkY0LVEiLCJwaG9uZUlkIjoiZjk1NDY1YTAtMzYyYi00OTE4LTgzMWUtOTVkOWIzYzQ0YzFmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5GQlhwTi8rblhRVHRHMFpOK0VsYmFwd2dIND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrWWJlWnZCSXZ5OC8rczNEOWJycDRqS3E1a289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWlhGSkVaRkYiLCJtZSI6eyJpZCI6IjI1NTYyMTk5NTQ4Mjo5NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJZZXNzZXJ0ZWNoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJZnZ1Y2dFRUwvTHZyZ0dHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJmaDNSQ3paWWduZ1ByQWVHaE5MK25rLzZ0dWJvVXZrSDdkNEJhNlhyT0FjPSIsImFjY291bnRTaWduYXR1cmUiOiJUWHgzSjBSMkxmZlFEa25mWjVPNExoSkFvZzBZS2ZmRlA0T1llbUxGU3VEOXRxdngvM2h2ditqYS82b0U3OG9lSVZRbVZ2WVRnUGhRV1Jid0t2Z3VBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQjl4bXMrRTZIMlBxSDFpMzVWb2tLR1hObll4Z0pJeFA5bFdGWXAxT1J5T25DSkNmMnduVGZidk1qZUNXRFdVM2NWTzJzdnlCaWxlNGtRV2NpSkNRQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2MjE5OTU0ODI6OTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWDRkMFFzMldJSjRENndIaG9UUy9wNVArcmJtNkZMNUIrM2VBV3VsNnpnSCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTA3ODczMn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "yessertech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255621995482",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Immortal_dragon',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/won03k.jpeg',
    MODE: process.env.PUBLIC_MODE || "no",
                  
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
