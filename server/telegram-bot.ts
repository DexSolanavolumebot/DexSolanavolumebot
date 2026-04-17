/**
 * Telegram Bot Handler for DexSolana Volume Bot
 * Handles all user interactions and bot commands
 */

import { ENV } from './_core/env';

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
      title?: string;
      username?: string;
    };
    date: number;
    text?: string;
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
    message?: {
      message_id: number;
      chat: {
        id: number;
      };
    };
    data?: string;
  };
}

interface UserSession {
  userId: number;
  state: 'menu' | 'increase_holders' | 'increase_volume' | 'support' | 'awaiting_ca' | 'awaiting_speed' | 'awaiting_amount';
  tokenCA?: string;
  speed?: string;
  amount?: number;
  createdAt: number;
}

// In-memory session storage (use Redis in production)
const userSessions = new Map<number, UserSession>();

const BOT_TOKEN = ENV.telegramBotToken;
const DEPOSIT_WALLET = ENV.solanaDepositWallet;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

/**
 * Send a message to the user
 */
export async function sendMessage(
  chatId: number,
  text: string,
  options?: {
    parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
    reply_markup?: any;
    disable_web_page_preview?: boolean;
  }
) {
  try {
    const response = await fetch(`${API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        ...options,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

/**
 * Edit a message
 */
export async function editMessage(
  chatId: number,
  messageId: number,
  text: string,
  options?: any
) {
  try {
    const response = await fetch(`${API_URL}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text,
        ...options,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error editing message:', error);
  }
}

/**
 * Answer callback query
 */
export async function answerCallbackQuery(
  callbackQueryId: string,
  options?: {
    text?: string;
    show_alert?: boolean;
  }
) {
  try {
    const response = await fetch(`${API_URL}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        ...options,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error answering callback query:', error);
  }
}

/**
 * Get or create user session
 */
function getUserSession(userId: number): UserSession {
  if (!userSessions.has(userId)) {
    userSessions.set(userId, {
      userId,
      state: 'menu',
      createdAt: Date.now(),
    });
  }
  return userSessions.get(userId)!;
}

/**
 * Show main menu
 */
export async function showMainMenu(chatId: number) {
  const session = getUserSession(chatId);
  session.state = 'menu';

  const keyboard = {
    inline_keyboard: [
      [
        { text: '👥 Increase Holders', callback_data: 'increase_holders' },
        { text: '📈 Increase Volume', callback_data: 'increase_volume' },
      ],
      [
        { text: '💬 Support', callback_data: 'support' },
      ],
      [
        { text: '📱 Open Mini App', url: 'https://3000-idr5o7vzcitxzg3mqoode-9816f310.us2.manus.computer' },
      ],
    ],
  };

  await sendMessage(
    chatId,
    `🚀 <b>Solana Volume Booster Bot</b>\n\nAutomated volume boosting until funds are depleted.\n\nChoose:`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }
  );
}

/**
 * Handle increase holders flow
 */
export async function handleIncreaseHolders(chatId: number) {
  const session = getUserSession(chatId);
  session.state = 'awaiting_ca';

  await sendMessage(
    chatId,
    `📋 <b>Send Token Contract Address (CA):</b>\n\nExample: <code>EPjFWaJsKqSo3jvyPboL5SykxKHc5epnH8qB2BVXx5N</code>`,
    { parse_mode: 'HTML' }
  );
}

/**
 * Handle increase volume flow
 */
export async function handleIncreaseVolume(chatId: number) {
  const session = getUserSession(chatId);
  session.state = 'awaiting_ca';

  await sendMessage(
    chatId,
    `📋 <b>Send Token Contract Address (CA):</b>\n\nExample: <code>EPjFWaJsKqSo3jvyPboL5SykxKHc5epnH8qB2BVXx5N</code>`,
    { parse_mode: 'HTML' }
  );
}

/**
 * Handle token CA input
 */
export async function handleTokenCA(chatId: number, ca: string) {
  const session = getUserSession(chatId);

  // Validate CA format (basic check)
  if (ca.length < 30 || ca.length > 50) {
    await sendMessage(chatId, '❌ Invalid contract address. Please try again.');
    return;
  }

  session.tokenCA = ca;
  session.state = 'awaiting_speed';

  const keyboard = {
    inline_keyboard: [
      [{ text: '⚡ Fast (1-2h)', callback_data: 'speed_fast' }],
      [{ text: '🦎 Medium (4-6h)', callback_data: 'speed_medium' }],
      [{ text: '🐢 Slow (12-14h)', callback_data: 'speed_slow' }],
      [{ text: '🦥 Ultra Slow (22-24h)', callback_data: 'speed_ultra' }],
    ],
  };

  await sendMessage(
    chatId,
    `✅ <b>Token accepted!</b>\nDecimals: 6\n\nSelect speed:`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }
  );
}

/**
 * Handle speed selection
 */
export async function handleSpeedSelection(chatId: number, speed: string) {
  const session = getUserSession(chatId);
  session.speed = speed;
  session.state = 'awaiting_amount';

  const speedNames: Record<string, string> = {
    speed_fast: 'Fast (1-2h)',
    speed_medium: 'Medium (4-6h)',
    speed_slow: 'Slow (12-14h)',
    speed_ultra: 'Ultra Slow (22-24h)',
  };

  await sendMessage(
    chatId,
    `⚡ <b>Speed Selected: ${speedNames[speed]}</b>\n\n💰 <b>Send Amount in SOL:</b>\n\nMinimum: 0.1 SOL\nMaximum: 100 SOL`,
    { parse_mode: 'HTML' }
  );
}

/**
 * Handle amount input
 */
export async function handleAmountInput(chatId: number, amountText: string) {
  const session = getUserSession(chatId);
  const amount = parseFloat(amountText);

  if (isNaN(amount) || amount < 0.1 || amount > 100) {
    await sendMessage(
      chatId,
      '❌ Invalid amount. Please send a number between 0.1 and 100 SOL.'
    );
    return;
  }

  session.amount = amount;

  // Show confirmation
  const speedNames: Record<string, string> = {
    speed_fast: 'Fast (1-2h)',
    speed_medium: 'Medium (4-6h)',
    speed_slow: 'Slow (12-14h)',
    speed_ultra: 'Ultra Slow (22-24h)',
  };

  const keyboard = {
    inline_keyboard: [
      [
        { text: '✅ Confirm', callback_data: 'confirm_order' },
        { text: '❌ Cancel', callback_data: 'cancel_order' },
      ],
    ],
  };

  await sendMessage(
    chatId,
    `📊 <b>Order Summary:</b>\n\n` +
      `💰 Amount: <code>${amount} SOL</code>\n` +
      `⚡ Speed: ${speedNames[session.speed || 'speed_fast']}\n` +
      `📍 Deposit: <code>${DEPOSIT_WALLET}</code>\n\n` +
      `Confirm order?`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }
  );
}

/**
 * Handle order confirmation
 */
export async function handleConfirmOrder(chatId: number) {
  const session = getUserSession(chatId);

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '💳 Pay with Wallet',
          url: `https://3000-idr5o7vzcitxzg3mqoode-9816f310.us2.manus.computer?deposit=${session.amount}&wallet=${DEPOSIT_WALLET}`,
        },
      ],
      [{ text: '📱 Open Mini App', url: 'https://3000-idr5o7vzcitxzg3mqoode-9816f310.us2.manus.computer' }],
      [{ text: '🏠 Back to Menu', callback_data: 'back_to_menu' }],
    ],
  };

  await sendMessage(
    chatId,
    `✅ <b>Order Confirmed!</b>\n\n` +
      `💰 Amount: <code>${session.amount} SOL</code>\n` +
      `📍 Send to: <code>${DEPOSIT_WALLET}</code>\n\n` +
      `Click below to pay:`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }
  );

  session.state = 'menu';
}

/**
 * Handle support request
 */
export async function handleSupport(chatId: number) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '📧 Email Support', url: 'mailto:support@dexsolana.com' },
        { text: '💬 Telegram Support', url: 'https://t.me/DexSolanaSupport' },
      ],
      [{ text: '📚 Documentation', url: 'https://docs.dexsolana.com' }],
      [{ text: '🏠 Back to Menu', callback_data: 'back_to_menu' }],
    ],
  };

  await sendMessage(
    chatId,
    `💬 <b>Support</b>\n\n` +
      `Need help? Contact us:\n\n` +
      `📧 Email: support@dexsolana.com\n` +
      `💬 Telegram: @DexSolanaSupport\n` +
      `📚 Docs: docs.dexsolana.com`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }
  );
}

/**
 * Process Telegram update
 */
export async function processTelegramUpdate(update: TelegramUpdate) {
  try {
    // Handle text messages
    if (update.message?.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const session = getUserSession(chatId);

      if (text === '/start') {
        await showMainMenu(chatId);
      } else if (session.state === 'awaiting_ca') {
        await handleTokenCA(chatId, text);
      } else if (session.state === 'awaiting_amount') {
        await handleAmountInput(chatId, text);
      } else {
        await showMainMenu(chatId);
      }
    }

    // Handle callback queries (button clicks)
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const chatId = callbackQuery.message?.chat.id;
      const data = callbackQuery.data;

      if (!chatId) return;

      await answerCallbackQuery(callbackQuery.id);

      switch (data) {
        case 'increase_holders':
          await handleIncreaseHolders(chatId);
          break;
        case 'increase_volume':
          await handleIncreaseVolume(chatId);
          break;
        case 'support':
          await handleSupport(chatId);
          break;
        case 'speed_fast':
        case 'speed_medium':
        case 'speed_slow':
        case 'speed_ultra':
          await handleSpeedSelection(chatId, data);
          break;
        case 'confirm_order':
          await handleConfirmOrder(chatId);
          break;
        case 'cancel_order':
          await showMainMenu(chatId);
          break;
        case 'back_to_menu':
          await showMainMenu(chatId);
          break;
      }
    }
  } catch (error) {
    console.error('Error processing Telegram update:', error);
  }
}

export default {
  processTelegramUpdate,
  showMainMenu,
  sendMessage,
  editMessage,
  answerCallbackQuery,
};
