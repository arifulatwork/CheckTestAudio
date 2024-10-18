export interface Lesson {
  day: number; // Javascript number 0-6
  time: {
    hour: number;
    minute: number;
    duration: number;
  };
  startDate: string; // format 'YYYY-MM-DD'
  teacherID: string[];
  studentID: string;
}

export type LessonFields = keyof Lesson;
export const lessonCollectionName = 'lessons';
