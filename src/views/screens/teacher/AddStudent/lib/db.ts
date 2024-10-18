import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_DB } from 'firebaseConfig';

import i18n from '@/translations/i18n';
import { Lesson, LessonFields } from '@/types/Lesson';
import { UserFields, User, userCollectionName } from '@/types/User';
import track from '@/utils/analytics';
import { makeUserNameWithEmail } from '@/views/screens/welcome/lib/db';

type AddStudentPayload = {
  email: string;
  currentUserId: string;
  lessonPayload: Omit<Lesson, 'studentID' | 'teacherID'>;
};

const createUnclaimedStudentAccount = async (email: string, school: string) => {
  const usersRef = collection(FIREBASE_DB, userCollectionName);
  const payload: User = {
    name: email.split('@')[0].replaceAll('.', ' '),
    userType: 'Student',
    school,
    emailForAddStudent: email,
  };
  const snap = await addDoc(usersRef, payload);
  return snap.id;
};

export const addStudentForTeacher = async (pl: AddStudentPayload, school: string) => {
  // NOTE: we'll have to run this on server to make it more secure before launching to a bigger audience

  // Check if user exists
  const usersRef = collection(FIREBASE_DB, 'users');

  const emailField: UserFields = 'emailForAddStudent';
  const userType: UserFields = 'userType';
  const userTypeValue: User['userType'] = 'Student';
  const usernameOrEmail = makeUserNameWithEmail(pl.email);

  const userQuery = query(
    usersRef,
    where(emailField, '==', usernameOrEmail),
    where(userType, '==', userTypeValue)
  );
  const userQuerySnapshot = await getDocs(userQuery);
  const studentSnap = userQuerySnapshot.docs.find((d) => d.id);
  let studentId = studentSnap?.id;
  if (!studentSnap?.exists) {
    // user doesn't exist -> let's create a temporary account
    studentId = await createUnclaimedStudentAccount(usernameOrEmail, school);
  }

  if (!studentId) {
    throw new Error(i18n.t('teacher.AddStudent.createStudentError'));
  }

  // check if teacher already has that student
  const lessonsRef = collection(FIREBASE_DB, 'lessons');
  const teacherID: LessonFields = 'teacherID';
  const studentID: LessonFields = 'studentID'; // <- this is done to enforce type-safety on the fields
  const lessonQuery = query(
    lessonsRef,
    where(teacherID, 'array-contains', pl.currentUserId),
    where(studentID, '==', studentId)
  );
  const lessonQuerySnapshot = await getDocs(lessonQuery);
  if (lessonQuerySnapshot.size > 0)
    throw new Error(i18n.t('teacher.AddStudent.studentAlreadyAssociatedError'));

  // all ok, proceed to create the lesson
  const lesson: Lesson = {
    ...pl.lessonPayload,
    teacherID: [pl.currentUserId],
    studentID: studentId,
  };

  await addDoc(collection(FIREBASE_DB, 'lessons'), lesson);

  track({ name: 'Add Student' });
};
