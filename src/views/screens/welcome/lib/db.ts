// log the user in

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from 'firebaseConfig';

import i18n from '@/translations/i18n';
import { Lesson, LessonFields, lessonCollectionName } from '@/types/Lesson';
import { Task, TaskFields, taskCollectionName } from '@/types/Task';
import { User, UserFields, userCollectionName } from '@/types/User';
import track from '@/utils/analytics';

export const LastLogin = {
  LAST_LOGIN_KEY: 'lastLogin',
  async setLogin() {
    await AsyncStorage.setItem(this.LAST_LOGIN_KEY, Date.now().toString());
  },
  async getLogin() {
    const value = await AsyncStorage.getItem(this.LAST_LOGIN_KEY);
    return parseInt(value || '0'.toString(), 10);
  },
};

export const makeUserNameWithEmail = (username: string) => {
  if (username.includes('@')) return username;
  else return `${username}@bravori-users.com`;
};

// create an account

const createUserRecord = async (userId: string, user: User) => {
  await setDoc(doc(FIREBASE_DB, 'users', userId), user);
};

const claimExistingAccounts = async (email: string, newUserId: string) => {
  // find unclaimed User record(s) that have the same email

  const usersRef = collection(FIREBASE_DB, userCollectionName);
  const emailField: UserFields = 'emailForAddStudent';
  const q = query(usersRef, where(emailField, '==', email));
  const snap = await getDocs(q);

  if (snap.empty) return;

  // get the id(s)
  const unclaimedRefs = snap.docs.map((d) => d.ref).filter((ref) => ref.id !== newUserId);
  const unclaimedIds = unclaimedRefs.map((ref) => ref.id);
  if (unclaimedIds.length === 0) return;

  // find and replace all occurrences of Lesson and Tasks to the new user id
  // NOTE: For security purposes this should be run in a cloud function later on
  const lessonsRef = collection(FIREBASE_DB, lessonCollectionName);
  const studentIdField: LessonFields = 'studentID';
  const q2 = query(lessonsRef, where(studentIdField, 'in', unclaimedIds));
  const lessonsSnap = await getDocs(q2);
  const promises = lessonsSnap.docs.map(async (doc) => {
    const updateOp: Partial<Lesson> = { studentID: newUserId };
    return updateDoc(doc.ref, updateOp);
  });

  const tasksRef = collection(FIREBASE_DB, taskCollectionName);
  const taskStudentIdField: TaskFields = 'studentID';
  const q3 = query(tasksRef, where(taskStudentIdField, 'in', unclaimedIds));
  const tasksSnap = await getDocs(q3);
  promises.push(
    ...tasksSnap.docs.map((doc) => {
      const updateOp: Partial<Task> = { studentID: newUserId };
      return updateDoc(doc.ref, updateOp);
    })
  );

  await Promise.all(promises);

  // delete unclaimed accounts (this should be done in the backend for security purposes)
  await Promise.all(unclaimedRefs.map((ref): Promise<void> => deleteDoc(ref)));
};

export const createAccount = async (
  credentials: { email: string; password: string },
  userInfo: User
) => {
  const email = makeUserNameWithEmail(credentials.email);

  try {
    const auth = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, credentials.password);

    const userId = auth.user.uid;
    await createUserRecord(userId, userInfo);
    await claimExistingAccounts(email, userId);
    await LastLogin.setLogin();
    track({ name: 'Register' });
    return auth;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const logInUser = async (credentials: { email: string; password: string }) => {
  const email = makeUserNameWithEmail(credentials.email);
  try {
    const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, credentials.password);
    await LastLogin.setLogin();
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const resetPassword = async (credentials: { email: string }) => {
  try {
    if (!credentials.email.includes('@')) throw new Error(i18n.t('welcome.emailResetError'));
    return sendPasswordResetEmail(FIREBASE_AUTH, credentials.email);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
