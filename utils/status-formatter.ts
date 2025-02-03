import {TacStatus, StatusDescription} from '../types.js';

export class StatusFormatter {
  private static readonly STATUS_DESCRIPTIONS: Record<TacStatus, StatusDescription> = {
    EVMMerkleMessageCollected: {
      emoji: '📥',
      description: 'Validator has collected all events for the sharded message',
    },
    EVMMerkleRootSet: {
      emoji: '🌳',
      description: 'Message has been added to the Merkle tree',
    },
    EVMMerkleMessageExecuted: {
      emoji: '⚡',
      description: 'Message has been executed on the EVM side',
    },
    TVMMerkleMessageCollected: {
      emoji: '📤',
      description: 'Return message has been generated for TVM execution',
    },
    TVMMerkleRootSet: {
      emoji: '🌲',
      description: 'TVM message has been added to the tree',
    },
    TVMMerkleMessageExecuted: {
      emoji: '✅',
      description: 'Transaction has been fully executed',
    },
  };

  static formatStatus(operationId: string, status: TacStatus): string {
    const {emoji, description} = this.STATUS_DESCRIPTIONS[status] || {
      emoji: '❓',
      description: 'Unknown status',
    };

    return `
Transaction Status ${emoji}

Operation ID: \`${operationId}\`
Status: ${status}

${description}
    `.trim();
  }

  static isFinalState(status: TacStatus): boolean {
    return status === 'TVMMerkleMessageExecuted';
  }
}
