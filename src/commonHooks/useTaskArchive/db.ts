import { addDays, startOfDay } from 'date-fns';
import {
  DocumentData,
  QueryConstraint,
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import { FIREBASE_DB } from 'firebaseConfig';

import { TaskFields, taskCollectionName } from '@/types/Task';

export const dateConstraint = () => {
  // 2 days from start of day
  return startOfDay(addDays(new Date(), -2)).getTime();
};

export const ARCHIVE_TASK_LOAD_LIMIT = 5;

export const getTasksFromArchive = async ({
  studentId,
  teacherId,
  startAtTimeUnix,
}: {
  studentId: string;
  teacherId?: string;
  startAtTimeUnix?: number;
}) => {
  const ref = collection(FIREBASE_DB, taskCollectionName);
  const whereField: TaskFields = 'studentID';
  const teacherIdField: TaskFields = 'teacherID';
  const dueDateUnixField: TaskFields = 'dueDateUnix';
  const operations: QueryConstraint[] = [
    where(whereField, '==', studentId),
    orderBy(dueDateUnixField, 'desc'),
    startAt((startAtTimeUnix || dateConstraint()) - 1),
    limit(ARCHIVE_TASK_LOAD_LIMIT),
  ];

  if (teacherId) {
    operations.unshift(where(teacherIdField, 'array-contains', teacherId));
  }

  const q = query(ref, ...operations);

  const docs = await getDocs(q);
  return docs;
};

export const updateArchive = async (tasks: DocumentData[]) => {
  if (tasks.length === 0) return [];
  const ids = tasks.map((t) => t.id);
  const ref = collection(FIREBASE_DB, taskCollectionName);
  const q = query(ref, where(documentId(), 'in', ids));
  const docs = await getDocs(q);
  return docs;
};
