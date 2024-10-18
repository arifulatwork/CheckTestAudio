import {
  query,
  collection,
  where,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  FieldPath,
  FirestoreError,
} from 'firebase/firestore';
import { FIREBASE_DB } from 'firebaseConfig';
import { chunk } from 'lodash';

// This function is used because Firestore only supports 10 elements in the `in` statement.
// So if you have more than 10 students, you have to subscribe in 10 element chunks
export default function listenMultipleDocs<T>(
  ids: string[],
  collectionName: string,
  whereField: FieldPath | string,
  onSomeDocumentsChange: (data: QueryDocumentSnapshot<T, DocumentData>[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (e?: FirestoreError) => void
) {
  return chunk(ids, 10).map((chunkIds) => {
    const q = query(collection(FIREBASE_DB, collectionName), where(whereField, 'in', chunkIds));
    const unsub = onSnapshot(
      q,
      (users) => {
        const docs = users.docs as QueryDocumentSnapshot<T, DocumentData>[]; // typecasting to get the data right
        onSomeDocumentsChange(docs.filter((d) => d.exists()));
        setLoading(false);
        setError(undefined);
      },
      (error) => {
        setError(error);
      }
    );
    return unsub;
  });
}
