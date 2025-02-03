import dotenv from 'dotenv';
import {cleanEnv, str} from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  BOT_TOKEN: str(),
  TAC_NETWORK: str({choices: ['testnet', 'mainnet']}),
  LOG_LEVEL: str({choices: ['error', 'warn', 'info', 'debug']}),
});

export const config = {
  bot: {
    token: env.BOT_TOKEN,
  },
  tac: {
    network: env.TAC_NETWORK,
    delay: 3,
  },
  logging: {
    level: env.LOG_LEVEL,
  },
} as const;
