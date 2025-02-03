import {Network, SDKParams, TacSdk, OperationTracker} from 'tac-sdk';
import {config} from '../config/index.js';
import {logger} from '../utils/logger.js';
import {TacStatus} from '../types.js';

export class TacService {
  private static instance: TacService;
  private sdk: any;
  private tracker: OperationTracker;

  private constructor() {
    const sdkParams: SDKParams = {
      network: config.tac.network as Network,
      delay: config.tac.delay,
    };
    this.sdk = TacSdk.create(sdkParams);
    this.tracker = new OperationTracker(sdkParams.network);
  }

  static getInstance(): TacService {
    if (!TacService.instance) {
      TacService.instance = new TacService();
    }
    return TacService.instance;
  }

  async init(): Promise<void> {
    try {
      this.sdk = await this.sdk;
      logger.info('TAC SDK initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize TAC SDK:', error);
      throw error;
    }
  }

  async getTransactionStatus(operationId: string): Promise<TacStatus> {
    try {
      console.log('==>', operationId);
      const operation = await this.tracker.getOperationStatus(operationId);
      return operation.status as TacStatus;
    } catch (error) {
      logger.error(`Error getting transaction status for ${operationId}:`, error);
      throw error;
    }
  }
}
