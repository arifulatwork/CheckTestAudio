import { LanguageCode } from '@/components/common/Language';

export type UserReward = { id: string; taskId: string };
export interface User {
  name: string;
  profilePhoto?: string;
  userType: 'Teacher' | 'Student';
  school: string;
  emailForAddStudent?: string; // Email will be stored temporarily. Should be used only in the AddStudent flow
  language?: LanguageCode;
  rewards?: UserReward[];
}

export type UserFields = keyof User;
export const userCollectionName = 'users';
