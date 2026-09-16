require('dotenv').config();
const { Telegraf, Markup, session } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

bot.use(session());

const ADMIN_TELEGRAM_ID = process.env.ADMIN_TELEGRAM_ID;

function clearState(ctx) {
  if (!ctx.session) ctx.session = {};
  ctx.session.state = null;
}

// 1. /start
bot.command('start', (ctx) => {
  clearState(ctx);
  return ctx.reply(
    '👋 *Welcome to 1st Year MC Portal Bot!*\n\nSelect an option below or use slash commands:',
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🗂 Temp Vault', 'btn_tempvault')],
        [Markup.button.callback('🔍 Search Materials', 'btn_search')],
        [Markup.button.callback('🔑 Sign-in Help', 'btn_signup')],
        [Markup.button.callback('💡 Send Feedback', 'btn_submit')]
      ])
    }
  );
});

// 2. /signup
bot.command('signup', (ctx) => {
  if (!ctx.session) ctx.session = {};
  ctx.session.state = 'AWAITING_SIGNUP_ISSUE';
  return ctx.reply(
    '⚠️ *Sign-in / Account Help*\n\nPlease describe the issue you are facing with your portal login (e.g., student email not recognized, OTP not arriving).',
    { parse_mode: 'Markdown' }
  );
});
bot.action('btn_signup', (ctx) => {
  ctx.answerCbQuery();
  ctx.session.state = 'AWAITING_SIGNUP_ISSUE';
  return ctx.reply('Please describe your sign-in issue:');
});

// 3. /tempvault
bot.command('tempvault', async (ctx) => {
  clearState(ctx);
  const { data, error } = await supabase
    .from('materials')
    .select('title, file_url')
    .eq('category', 'temp_vault')
    .limit(8);

  if (error || !data || data.length === 0) {
    return ctx.reply('🗂 No temporary files or slides currently found in the Temp Vault.');
  }

  const buttons = data.map((item) => [Markup.button.url(item.title, item.file_url)]);
  return ctx.reply('🗂 *Temp Vault Files:*', {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard(buttons)
  });
});
bot.action('btn_tempvault', (ctx) => {
  ctx.answerCbQuery();
  return bot.handleUpdate({ ...ctx.update, message: { text: '/tempvault', from: ctx.from, chat: ctx.chat } });
});

// 4. /search
bot.command('search', (ctx) => {
  if (!ctx.session) ctx.session = {};
  ctx.session.state = 'AWAITING_SEARCH_OR_ISSUE';
  return ctx.reply(
    '🔍 *Material Search & Support*\n\nSend a keyword to find files, or describe an issue with a specific study material:',
    { parse_mode: 'Markdown' }
  );
});
bot.action('btn_search', (ctx) => {
  ctx.answerCbQuery();
  ctx.session.state = 'AWAITING_SEARCH_OR_ISSUE';
  return ctx.reply('Please send the material title or keyword to search:');
});

// 5. /submit
bot.command('submit', (ctx) => {
  if (!ctx.session) ctx.session = {};
  ctx.session.state = 'AWAITING_FEEDBACK';
  return ctx.reply(
    '💡 *Feedback & Suggestions*\n\nSend us your suggestions or feature ideas for the portal.',
    { parse_mode: 'Markdown' }
  );
});
bot.action('btn_submit', (ctx) => {
  ctx.answerCbQuery();
  ctx.session.state = 'AWAITING_FEEDBACK';
  return ctx.reply('Please send your feedback:');
});

// 6. /admin
bot.command('admin', (ctx) => {
  clearState(ctx);
  if (String(ctx.from.id) !== String(ADMIN_TELEGRAM_ID)) {
    return ctx.reply('⛔ *Access Denied*: This command is restricted to portal administrators.', {
      parse_mode: 'Markdown'
    });
  }

  return ctx.reply(
    '🛡 *Admin Control Panel*\n\nSelect an administrative action:',
    Markup.inlineKeyboard([
      [Markup.button.callback('📋 View Recent Tickets', 'admin_view_tickets')]
    ])
  );
});

bot.action('admin_view_tickets', async (ctx) => {
  ctx.answerCbQuery();
  if (String(ctx.from.id) !== String(ADMIN_TELEGRAM_ID)) return;

  const { data } = await supabase
    .from('bot_tickets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (!data || data.length === 0) return ctx.reply('No active tickets found.');

  const report = data
    .map((t) => `• *[${t.type.toUpperCase()}]* @${t.username || 'anon'}:\n"${t.message}"`)
    .join('\n\n');

  return ctx.replyWithMarkdown(`📥 *Recent Tickets:*\n\n${report}`);
});

// Text Router for conversational inputs
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();
  const state = ctx.session?.state;

  if (text.startsWith('/')) return;

  if (state === 'AWAITING_SIGNUP_ISSUE') {
    await supabase.from('bot_tickets').insert({
      user_id: String(ctx.from.id),
      username: ctx.from.username || ctx.from.first_name,
      type: 'signup_issue',
      message: text
    });
    clearState(ctx);
    return ctx.reply('✅ Your sign-in issue has been logged. The admin will review it.');
  }

  if (state === 'AWAITING_FEEDBACK') {
    await supabase.from('bot_tickets').insert({
      user_id: String(ctx.from.id),
      username: ctx.from.username || ctx.from.first_name,
      type: 'feedback',
      message: text
    });
    clearState(ctx);
    return ctx.reply('✅ Thank you! Your feedback has been forwarded.');
  }

  // Fallback search
  const { data, error } = await supabase
    .from('materials')
    .select('title, file_url')
    .ilike('title', `%${text}%`)
    .limit(5);

  clearState(ctx);

  if (!error && data && data.length > 0) {
    const buttons = data.map((item) => [Markup.button.url(item.title, item.file_url)]);
    return ctx.reply(`🔍 Found ${data.length} material(s) matching "${text}":`, Markup.inlineKeyboard(buttons));
  }

  return ctx.reply(`No exact match for "${text}". Use /submit if you want to suggest adding this material.`);
});

bot.launch().then(() => console.log('✅ Full portal bot running and ready!'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
