// Since Firebase has internal caching, it shouldn't matter if we instantiate a lot of these instances.
// hook should get students

import {
  DocumentData,
  FirestoreError,
  QueryDocumentSnapshot,
  documentId,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import listenMultipleDocs from './listenMultipleDocs';

import { User, userCollectionName } from '@/types/User';

type UserSnapshots = QueryDocumentSnapshot<User, DocumentData>[];

export default function useStudents() {
  const [students, setStudents] = useState<UserSnapshots>([]);
  const [studentId, setStudentId] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError>();

  const updateStudents = (docs: UserSnapshots) => {
    setStudents((previousState) => {
      const ids = docs.map((d) => d.id);
      const newState = [...previousState.filter((u) => !ids.includes(u.id)), ...docs];
      return newState;
    });
  };

  useEffect(() => {
    setLoading(true);
    if (studentId.length === 0) {
      setLoading(false);
      return () => {};
    }
    const unsubscribeFunctions = listenMultipleDocs<User>(
      studentId,
      userCollectionName,
      documentId(),
      updateStudents,
      setLoading,
      setError
    );
    return () => {
      unsubscribeFunctions.forEach((fn) => fn());
    };
  }, [studentId]);

  return { students, loading, error, setStudentId };
}
