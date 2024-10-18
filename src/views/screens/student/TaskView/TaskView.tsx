import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from 'firebaseConfig';
import { sample, sortBy } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import StudentTasksContainer from './components/studentTaskContainer';

import useTaskArchive from '@/commonHooks/useTaskArchive';
import { dateConstraint } from '@/commonHooks/useTaskArchive/db';
import useUser from '@/commonHooks/useUser';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import { MonkeyWave } from '@/components/characters/MonkeyWave';
import BravoriButton from '@/components/common/BravoriButton';
import ComponentWithBackground from '@/components/common/ComponentWithBackground';
import { allRewards } from '@/components/common/Reward/logic';
import Sticker from '@/components/common/Sticker';
import WelcomeHeader from '@/components/common/WelcomeHeader';
import useStudentTasks from '@/db/useStudentTasks';
import i18n from '@/translations/i18n';
import { UserReward } from '@/types/User';
import { PageParams } from '@/views/navigation';

type StudentTaskViewProps = {
  navigation: NativeStackNavigationProp<PageParams, 'StudentTaskView'>;
};

const StudentTaskView = ({ navigation }: StudentTaskViewProps) => {
  const [logout] = useSignOut(FIREBASE_AUTH);
  const { firebaseUser, bravoriUser } = useUser();
  const {
    archive,
    archiveLoadMoreEnabled,
    onArchiveGet,
    setStudentId,
    loading: archiveLoading,
    archiveLoadedOnce,
  } = useTaskArchive();
  const { tasks, setId, loading } = useStudentTasks('Student', undefined, [
    ['dueDateUnix', '>', dateConstraint()],
  ]);

  const rewardIcon = useMemo(() => {
    if (!bravoriUser || !bravoriUser.rewards || bravoriUser.rewards.length === 0) return undefined;
    const { id } = sample(bravoriUser.rewards) as UserReward;
    return allRewards.find((r) => r.id === id);
  }, [bravoriUser]);

  useEffect(() => {
    if (!firebaseUser) return;
    setId(firebaseUser.uid);
    setStudentId(firebaseUser.uid);
  }, [firebaseUser]);

  const logOut = async () => {
    const success = await logout();
    if (success) Alert.alert(i18n.t('student.TaskView.logoutAlert'));
    navigation.navigate('Login');
  };

  const studentTasks = useMemo(() => {
    return sortBy(
      tasks,
      (t) => `${new Date(t.data().dueDate).getTime()}-${t.data().createdAt || 0}`
    );
  }, [tasks]);

  const ArchiveComponent = () => (
    <BravoriButton
      style={{}}
      type="small"
      bgColor="secondary"
      onPress={() => onArchiveGet()}
      enabled={archiveLoadMoreEnabled && !archiveLoading}>
      {archiveLoadedOnce ? i18n.t('general.loadMore') : i18n.t('general.checkArchive')}
    </BravoriButton>
  );

  if (loading || !firebaseUser) return <Text>{i18n.t('general.Loading')}</Text>;

  return (
    <ComponentWithBackground type="topbottom" scroll>
      <View style={[styles.container]}>
        <WelcomeHeader onLogout={logOut} user={bravoriUser} firebaseUser={firebaseUser} />
        {rewardIcon ? (
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() => navigation.navigate('Rewards')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',

                borderRadius: 30,
              }}>
              <Sticker
                PngSource={rewardIcon.PngSource}
                size={50}
                numberOfSlices={1}
                numberOfSlicesToShow={1}
              />

              <Text style={[spacing.mh1, typography.text, typography.bold]}>
                {i18n.t('rewards.rewardsPageTitle')}
              </Text>
            </Pressable>
            <View style={{ flex: 1 }} />
          </View>
        ) : null}

        <View style={spacing.mt1}>
          {studentTasks.map((task, ix) => (
            <StudentTasksContainer
              style={spacing.mb1}
              key={`future-${ix}`}
              task={task.data()}
              goToTaskDetail={() => navigation.navigate('TaskDetails', { taskId: task.id })}
            />
          ))}

          {archive.length > 0 ? (
            <>
              {archive.map((task, ix) => (
                <StudentTasksContainer
                  style={spacing.mb1}
                  key={`future-${ix}`}
                  task={task.data()}
                  goToTaskDetail={() => navigation.navigate('TaskDetails', { taskId: task.id })}
                />
              ))}
            </>
          ) : null}
        </View>
        {tasks.length === 0 && archive.length === 0 ? (
          <View style={[spacing.mv1]}>
            <View style={[spacing.mb2, { maxHeight: 120 }]}>
              <MonkeyWave />
            </View>
            <Text style={typography.h2}>{i18n.t('student.TaskView.noTasks')}</Text>
            <Text style={[typography.h4, spacing.mt2]}>
              {i18n.t('student.TaskView.waitForTeacher')}
            </Text>
          </View>
        ) : null}

        <View style={spacing.mb1}>
          <ArchiveComponent />
        </View>

        <View style={{ flex: 1 }} />
        <BravoriButton onPress={logOut}>{i18n.t('general.Logout')}</BravoriButton>
      </View>
    </ComponentWithBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default StudentTaskView;
