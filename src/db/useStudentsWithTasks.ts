import { FirebaseError } from 'firebase/app';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import useLessons from './useLessons';
import useStudentTasks, { TaskQueryFilterConstraint } from './useStudentTasks';
import useStudents from './useStudents';

import { Lesson } from '@/types/Lesson';
import { Task } from '@/types/Task';
import { User } from '@/types/User';

export interface StudentWithTasks {
  studentDoc: QueryDocumentSnapshot<User, DocumentData>;
  tasks: QueryDocumentSnapshot<Task, DocumentData>[];
  lessons: QueryDocumentSnapshot<Lesson, DocumentData>[];
}

export default function useStudentsWithTasks(
  providedStudentIds?: string[],
  taskFilters?: TaskQueryFilterConstraint[]
) {
  const [teacherId, setTeacherId] = useState<string>();
  const [studentsWithTasks, setStudentsWithTasks] = useState<StudentWithTasks[]>([]);
  const [errors, setErrors] = useState<FirebaseError[]>([]);
  const [loading, setLoading] = useState(true);

  const { students, setStudentId, loading: studentsLoading, error: studentsError } = useStudents();
  const {
    tasks,
    setId: setTeacherIdTasks,
    loading: tasksLoading,
    error: tasksError,
  } = useStudentTasks('Teacher', undefined, taskFilters);

  const {
    lessons,
    setId: setTeacherIdLessons,
    loading: lessonsLoading,
    error: lessonsError,
  } = useLessons('Teacher');

  useEffect(() => {
    setTeacherIdTasks(teacherId);
    setTeacherIdLessons(teacherId);
  }, [teacherId]);

  useEffect(() => {
    const studentIds = lessons
      .map((l) => l.data().studentID)
      .filter((id) => (providedStudentIds ? providedStudentIds.includes(id) : true));
    setStudentId(studentIds);
  }, [lessons]);

  useEffect(() => {
    const newStudents: StudentWithTasks[] = students.map((s) => ({
      studentDoc: s,
      tasks: tasks.filter((t) => t.data().studentID === s.id),
      lessons: lessons.filter((l) => l.data().studentID === s.id),
    }));

    setStudentsWithTasks(newStudents);
  }, [students, lessons, tasks]);

  useEffect(() => {
    const errors: FirebaseError[] = [];
    if (tasksError) errors.push(tasksError);
    if (lessonsError) errors.push(lessonsError);
    if (studentsError) errors.push(studentsError);
    setErrors(errors);
  }, [tasksError, lessonsError, studentsError]);

  useEffect(() => {
    setLoading(studentsLoading || tasksLoading || lessonsLoading);
  }, [studentsLoading, tasksLoading, lessonsLoading]);

  return { studentsWithTasks, setTeacherId, errors, loading };
}
