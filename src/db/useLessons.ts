import {
  DocumentData,
  FirestoreError,
  QueryDocumentSnapshot,
  WhereFilterOp,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { FIREBASE_DB } from 'firebaseConfig';
import { useEffect, useState } from 'react';

import { Lesson, LessonFields, lessonCollectionName } from '@/types/Lesson';

type LessonDocData = QueryDocumentSnapshot<Lesson, DocumentData>[];

export default function useLessons(role: 'Student' | 'Teacher') {
  const [id, setId] = useState<string>();
  const [lessons, setLessons] = useState<LessonDocData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError>();

  useEffect(() => {
    if (!id) return;
    const ref = collection(FIREBASE_DB, lessonCollectionName);
    const whereField: LessonFields = role === 'Student' ? 'studentID' : 'teacherID';
    const filterOp: WhereFilterOp = role === 'Student' ? '==' : 'array-contains';
    const q = query(ref, where(whereField, filterOp, id));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs as LessonDocData;
        setLessons(docs.filter((doc) => doc.exists()));
        setLoading(false);
        setError(undefined);
      },
      (error) => {
        setError(error);
      }
    );
    return unsubscribe;
  }, [id]);

  return { lessons, loading, error, setId };
}
