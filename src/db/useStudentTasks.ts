import {
  DocumentData,
  FirestoreError,
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  WhereFilterOp,
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { FIREBASE_DB } from 'firebaseConfig';
import { useEffect, useState } from 'react';

import { Task, TaskFields, taskCollectionName } from '@/types/Task';

type TaskDocData = QueryDocumentSnapshot<Task, DocumentData>[];

export type TaskQueryFilterConstraint = [TaskFields, WhereFilterOp, unknown];

export default function useStudentTasks(
  role: 'Student' | 'Teacher',
  providedTaskId?: string,
  otherTaskFilters?: TaskQueryFilterConstraint[]
) {
  const [id, setId] = useState<string>();
  const [tasks, setTasks] = useState<TaskDocData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError>();

  useEffect(() => {
    if (!id) return;
    const ref = collection(FIREBASE_DB, taskCollectionName);
    const whereField: TaskFields = role === 'Student' ? 'studentID' : 'teacherID';
    const filterOp: WhereFilterOp = role === 'Student' ? '==' : 'array-contains';
    const whereOperations: QueryFieldFilterConstraint[] = [where(whereField, filterOp, id)];
    if (otherTaskFilters) whereOperations.push(...otherTaskFilters.map((c) => where(...c)));

    if (providedTaskId) {
      whereOperations.push(where(documentId(), '==', providedTaskId));
    }

    const q = query(ref, ...whereOperations);
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setLoading(false);
        const docs = snap.docs as TaskDocData;
        setTasks(docs.filter((doc) => doc.exists()));
        setError(undefined);
      },
      (error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [id]);

  return { tasks, loading, error, setId };
}
