export const BOT_TOKEN = process.env.BOT_TOKEN;

export const TELEGRAM_GETFILE_URL = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=`;
export const TELEGRAM_DOWNLOAD_URL = `https://api.telegram.org/file/bot${BOT_TOKEN}/`;
export const TELEGRAM_SENDDOCUMENT_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
