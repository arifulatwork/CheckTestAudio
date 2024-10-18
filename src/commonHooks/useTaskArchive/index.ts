import { DocumentData } from 'firebase/firestore';
import { orderBy, uniqBy } from 'lodash';
import { useState } from 'react';

import { ARCHIVE_TASK_LOAD_LIMIT, dateConstraint, getTasksFromArchive, updateArchive } from './db';

import { Task } from '@/types/Task';

const useTaskArchive = () => {
  const [archive, setArchive] = useState<DocumentData[]>([]);
  const [archiveLoadMoreEnabled, setArchiveLoadMoreEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [teacherId, setStoredTeacherId] = useState<string>();
  const [studentId, setStoredStudentId] = useState<string>();
  const [archiveLoadedOnce, setArchiveLoadedOnce] = useState(false);

  const onArchiveGet = async () => {
    setLoading(true);
    if (!studentId) throw new Error('No student id');
    const docs = await getTasksFromArchive({
      studentId,
      teacherId,
      startAtTimeUnix: archive[archive.length - 1]?.data().dueDateUnix,
    });
    if (docs.size > 0) {
      setArchive((old) => {
        return uniqBy([...old, ...docs.docs], (doc) => doc.id);
      });
    }

    if (docs.size < ARCHIVE_TASK_LOAD_LIMIT) {
      setArchiveLoadMoreEnabled(false);
    }
    setLoading(false);
    setArchiveLoadedOnce(true);
  };

  const update = async () => {
    const newArchive = await updateArchive(archive);
    const ordered = orderBy(newArchive.docs, (doc) => -(doc.data() as Task).dueDateUnix).filter(
      (d) => (d.data() as Task).dueDateUnix < dateConstraint()
    );
    setArchive(ordered);
  };

  return {
    archive,
    archiveLoadMoreEnabled,
    archiveLoadedOnce,
    loading,
    onArchiveGet,
    setTeacherId: setStoredTeacherId,
    setStudentId: setStoredStudentId,
    update,
  };
};

export default useTaskArchive;
