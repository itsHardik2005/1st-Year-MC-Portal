require('dotenv').config();
const { Telegraf } = require('telegraf');

if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN is missing from .env');
  process.exit(1);
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  console.log('Received /start from:', ctx.from.username || ctx.from.id);
  return ctx.reply('Bot is online and responding!');
});

bot.launch()
  .then(() => console.log('Bot is officially listening to Telegram events...'))
  .catch((err) => console.error('Launch failed:', err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));