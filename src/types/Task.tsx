import { Attachment } from './Attachments';
import { Reward } from './Reward';
import { Session } from './Session';

export type TaskImage = 'blue' | 'carmin' | 'green' | 'ocher' | 'pink' | 'yellowCircle' | 'yellow';

export interface Task {
  title: string;
  description: string;
  dueDate: string;
  dueDateUnix: number;
  teacherID: string[];
  studentID: string;
  writtenNote: string;
  sessions: Session[];
  attachments: Attachment[];
  sessionDuration: number; // in minutes
  image: TaskImage;
  createdAt: number;
  reward?: Reward['id'];
}

export type TaskFields = keyof Task;
export const taskCollectionName = 'tasks';
