import { startOfDay } from 'date-fns';
import { Fragment } from 'react';
import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';

import { MAIN_ORANGE } from '@/Colors';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import NotificationBadge from '@/components/common/NotificationBadge';
import ProfilePic from '@/components/common/ProfilePic';
import i18n from '@/translations/i18n';
import { Task } from '@/types/Task';
import { formatDeadline, getUnApprovedTaskCount } from '@/utils/tasks';

type Props = {
  name: string;
  profileURI?: string;
  tasks: Task[];
  style?: StyleProp<ViewStyle>;
  onViewTasks?: () => void;
  outline?: boolean;
};

const getNextTasks = (tasks: Task[]) => {
  const futureTasks = tasks.filter(
    (t) => new Date(t.dueDate).getTime() > startOfDay(new Date()).getTime()
  );
  const pastTasks = tasks.filter(
    (t) => new Date(t.dueDate).getTime() < startOfDay(new Date()).getTime()
  );

  const tasksToLookAt = futureTasks.length > 0 ? futureTasks : pastTasks;

  const nextTasks = tasksToLookAt.sort(
    (a, b) =>
      Math.abs(Date.now() - new Date(a.dueDate).getTime()) -
      Math.abs(Date.now() - new Date(b.dueDate).getTime())
  );

  const firstDate = nextTasks[0]?.dueDate;
  return nextTasks.filter((t) => t.dueDate === firstDate);
};

const Student = ({ name, profileURI, tasks, style, onViewTasks, outline = false }: Props) => {
  const nextTasks = getNextTasks(tasks);

  return (
    <View
      style={[styles.container, spacing.pa1, spacing.mb1, outline ? styles.outlined : null, style]}>
      <View style={styles.imageContainer}>
        <NotificationBadge value={getUnApprovedTaskCount(tasks)} />
        <ProfilePic firebaseUri={profileURI} name={name} style={styles.image} />
      </View>
      <View style={[styles.contentContainer, spacing.ml1]}>
        <Text style={[typography.h3, typography.left]}>{name}</Text>
        {nextTasks.length === 0 ? (
          <Text style={typography.text}>{i18n.t('teacher.StudentList.NoTasksDue')}</Text>
        ) : (
          <Text style={typography.textSmall}>
            {i18n.t('teacher.StudentList.NextTasksDue')}:{' '}
            <Text style={[typography.textSmall, typography.bold, typography.actionColor]}>
              {formatDeadline(nextTasks[0].dueDate)}
            </Text>
          </Text>
        )}

        {nextTasks.map((t, i) => (
          <Fragment key={i}>
            <Text style={[typography.textSmall, typography.bold]}>{t.title}</Text>
          </Fragment>
        ))}
      </View>
    </View>
  );
};

const imageDimensions = 80;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  outlined: {
    borderWidth: 2,
    borderColor: MAIN_ORANGE,
  },
  imageContainer: {
    width: imageDimensions,
    borderRadius: 100,
  },
  image: {
    width: '100%',
    height: imageDimensions,
  },

  contentContainer: {
    flex: 1,
  },
  button: {
    alignSelf: 'flex-end',
  },
});

export default Student;
