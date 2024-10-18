import { Feedback } from './Feedback';

export interface Session {
  completedAt?: number;
  approvedAt?: number;
  sessionTimeElapsed: number; // seconds
  feedback: Feedback[];
}
