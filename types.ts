export interface TrackingSession {
  operationId: string;
  messageId: number;
  isActive: boolean;
  startTime: number;
}

export interface StatusDescription {
  emoji: string;
  description: string;
}

export type TacStatus =
  | 'EVMMerkleMessageCollected'
  | 'EVMMerkleRootSet'
  | 'EVMMerkleMessageExecuted'
  | 'TVMMerkleMessageCollected'
  | 'TVMMerkleRootSet'
  | 'TVMMerkleMessageExecuted';
