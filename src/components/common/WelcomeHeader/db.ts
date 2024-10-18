import { deleteUser, User as FirebaseUser } from 'firebase/auth';
import { doc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from 'firebaseConfig';

import { LessonFields, lessonCollectionName } from '@/types/Lesson';
import { TaskFields, taskCollectionName } from '@/types/Task';
import { User } from '@/types/User';
import { LastLogin } from '@/views/screens/welcome/lib/db';

export const updateProfilePic = async (userId: string, picUrl: string) => {
  const docRef = doc(FIREBASE_DB, 'users', userId);
  const update: Partial<User> = { profilePhoto: picUrl };
  await updateDoc(docRef, update);
};

const findDocsInCollectionWhere = (
  collectionName: string,
  fieldName: string,
  fieldValue: string
) => {
  const ref = collection(FIREBASE_DB, collectionName);
  const q = query(ref, where(fieldName, '==', fieldValue));
  return getDocs(q);
};

export const deleteAccount = async (firebaseUser: FirebaseUser) => {
  // Note: doesn't delete teacher's assets

  const lastLogin = await LastLogin.getLogin();
  if (lastLogin + 10 * 60 * 1000 < Date.now()) {
    // if logged in more than 10 minutes ago
    throw new Error('auth/requires-recent-login');
  }

  const studentIdField: TaskFields | LessonFields = 'studentID';
  const tasks = await findDocsInCollectionWhere(
    taskCollectionName,
    studentIdField,
    firebaseUser.uid
  );
  const lessons = await findDocsInCollectionWhere(
    lessonCollectionName,
    studentIdField,
    firebaseUser.uid
  );

  const taskPromises = tasks.docs.map((t) => deleteDoc(t.ref));
  const lessonPromises = lessons.docs.map((l) => deleteDoc(l.ref));

  await Promise.all([...taskPromises, ...lessonPromises]);
  await deleteUser(firebaseUser);
};
