import TelegramBot from 'node-telegram-bot-api';
import {config} from '../config/index.js';
import {logger} from '../utils/logger.js';
import {TacService} from './tac.service.js';
import {StatusFormatter} from '../utils/status-formatter.js';

export class BotService {
  private bot: TelegramBot;
  private tacService: TacService;

  constructor() {
    this.bot = new TelegramBot(config.bot.token, {polling: true});
    this.tacService = TacService.getInstance();
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.bot.onText(/\/start/, this.handleStart.bind(this));
    this.bot.onText(/\/help/, this.handleHelp.bind(this));
    this.bot.onText(/\/track (.+)/, this.handleTrack.bind(this));
    this.bot.on('polling_error', this.handlePollingError.bind(this));
  }

  private async handleStart(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;
    logger.info(`New user started bot - Chat ID: ${chatId}`);

    await this.bot.sendMessage(
      chatId,
      `Welcome to the TAC Transaction Tracker Bot! 🚀\n\n` +
        `This bot helps you check the status of your TAC network transactions.\n` +
        `Simply use /track followed by your operation ID to check status.\n\n` +
        `Use /help to see all available commands.`
    );
  }

  private async handleHelp(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;
    await this.bot.sendMessage(
      chatId,
      `Available commands:\n\n` +
        `/track <operationId> - Check a TAC transaction status\n` +
        `/help - Show this help message\n\n` +
        `Example:\n` +
        `/track abc123...`
    );
  }

  private async handleTrack(msg: TelegramBot.Message, match: RegExpExecArray | null): Promise<void> {
    const chatId = msg.chat.id;
    if (!match?.[1]) return;

    const operationId = match[1].trim();
    logger.info(`Status check request - Chat ID: ${chatId}, Operation ID: ${operationId}`);

    try {
      const status = await this.tacService.getTransactionStatus(operationId);
      const formattedStatus = StatusFormatter.formatStatus(operationId, status);
      await this.bot.sendMessage(chatId, formattedStatus, {parse_mode: 'Markdown'});
    } catch (error) {
      logger.error('Error checking transaction status:', error);
      await this.bot.sendMessage(
        chatId,
        `Error checking transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private handlePollingError(error: Error): void {
    logger.error('Telegram polling error:', error);
  }
}
