import {logger} from '../utils/logger.js';
import {TacService} from '../services/tac.service.js';
import {BotService} from '../services/bot.service.js';

async function bootstrap() {
  try {
    const tacService = TacService.getInstance();
    await tacService.init();

    new BotService();
    logger.info('Bot is running...');
  } catch (error) {
    logger.error('Failed to start the application:', error);
    process.exit(1);
  }
}

bootstrap();
