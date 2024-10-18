import { useMemo } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

import { MAIN_BLUE } from '@/Colors';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import { StudentWithTasks } from '@/db/useStudentsWithTasks';
import i18n from '@/translations/i18n';

interface Props {
  studentsWithTasks: StudentWithTasks[];
  onPress: () => void;
}

const UnApprovedTasksContainer = ({ studentsWithTasks, onPress }: Props) => {
  const unapprovedTasksCount = useMemo(() => {
    return studentsWithTasks.reduce((grandTotal, student) => {
      return (
        student.tasks.reduce((total, task) => {
          return (
            task.data().sessions.filter((s) => s.completedAt && s.completedAt > 0 && !s.approvedAt)
              .length + total
          );
        }, 0) + grandTotal
      );
    }, 0);
  }, [studentsWithTasks]);

  if (unapprovedTasksCount === 0) return null;

  return (
    <Pressable
      onPress={onPress}
      style={[spacing.mb2, styles.unapprovedTasksContainer, { padding: 7 }]}>
      <Text style={[typography.text, typography.center]}>
        {i18n.t('teacher.StudentList.youHaveUnapprovedTasks1')}
        <Text style={[typography.bold, { color: 'red' }]}>{unapprovedTasksCount}</Text>{' '}
        {i18n.t('teacher.StudentList.youHaveUnapprovedTasks2')}
      </Text>
      <Text style={[typography.text, typography.center]}>
        {' '}
        {i18n.t('teacher.StudentList.tapHereToApprove')}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  unapprovedTasksContainer: {
    borderRadius: 5,
    borderColor: MAIN_BLUE,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.75)',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
});

export default UnApprovedTasksContainer;
