import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import TaskImage from '@/components/common/TaskImage';
import i18n from '@/translations/i18n';
import { Task } from '@/types/Task';
import { formatDeadline } from '@/utils/tasks';

// Define the types for props
interface StudentTasksPageProps {
  task: Task;
  style?: StyleProp<ViewStyle>;
  goToTaskDetail: () => void;
}
const StudentTasksContainer = ({ task, style, goToTaskDetail }: StudentTasksPageProps) => {
  return (
    <View style={[styles.container, spacing.pa1, style]}>
      {/* Music image container, left side of the task container */}
      <View style={[styles.leftColumn, spacing.mr1]}>
        <TaskImage height={80} width={80} style={styles.taskImage} image={task.image} />
      </View>
      {/* Right side of the task container */}
      <View style={[styles.rightColumn]}>
        <Text style={[typography.h3, typography.left]}>{task.title}</Text>
        <Text style={typography.text}>
          {i18n.t('student.TaskView.deadline')}:
          <Text style={[typography.actionColor, typography.bold]}>
            {' '}
            {formatDeadline(task.dueDate)}
          </Text>
        </Text>
        <View style={{ alignItems: 'flex-end' }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
  },
  leftColumn: {
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
  },
  taskImage: {},
  detailsButton: {
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
});

export default StudentTasksContainer;
