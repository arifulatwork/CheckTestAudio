import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from 'firebaseConfig';
import { orderBy } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Student from './components/Student';
import UnApprovedTasksContainer from './components/UnApprovedTaskContainer';

import { MAIN_ORANGE } from '@/Colors';
import useUser from '@/commonHooks/useUser';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import BravoriButton from '@/components/common/BravoriButton';
import ComponentWithBackground from '@/components/common/ComponentWithBackground';
import Icon from '@/components/common/Icon';
import WelcomeHeader from '@/components/common/WelcomeHeader';
import useStudentsWithTasks from '@/db/useStudentsWithTasks';
import i18n from '@/translations/i18n';
import { PageParams } from '@/views/navigation';

type StudentListProps = {
  navigation: NativeStackNavigationProp<PageParams, 'StudentList'>;
};

const StudentList = ({ navigation }: StudentListProps) => {
  const [signOut] = useSignOut(FIREBASE_AUTH);
  const { bravoriUser, firebaseUser, loading } = useUser();
  const { setTeacherId, studentsWithTasks, loading: studentsLoading } = useStudentsWithTasks();

  useEffect(() => {
    setTeacherId(firebaseUser?.uid);
  }, [firebaseUser]);

  const onLogout = async () => {
    const success = await signOut();
    if (success) {
      Alert.alert(i18n.t('components.navigationError.signOutAlert'));
      navigation.navigate('Login');
    }
  };

  const studentsAlphabetical = useMemo(() => {
    return orderBy(studentsWithTasks, (student) => student.studentDoc.data().name);
  }, [studentsWithTasks]);

  if (!firebaseUser) return <Text>{i18n.t('general.Loading')}</Text>;

  return (
    <ComponentWithBackground
      type="topbottom"
      scroll
      fullScreenLoading={loading || studentsLoading || !firebaseUser || !bravoriUser}>
      <View style={[styles.container]}>
        <WelcomeHeader
          onLogout={onLogout}
          style={[spacing.mt1, spacing.mb2]}
          user={bravoriUser}
          firebaseUser={firebaseUser}
        />

        <View style={[styles.actionRow, spacing.mb2]}>
          <Text style={[typography.h3, typography.left]}>
            {i18n.t('teacher.StudentList.YourStudents')}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.push('AddStudent')}
            style={[styles.addStudentButton]}>
            <Icon name="IconAddWhite" width="100%" height="100%" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.push('Settings')}  // Navigate to Settings
          style={[styles.settingsButton]}>
          <Icon name="SettingsWhite" width={23} height={23} />
          </TouchableOpacity>
        </View>
        {studentsAlphabetical.length > 0 ? (
          <>
            <View style={styles.studentWrapper}>
              {studentsAlphabetical.map((s, i) => (
                <Student
                  key={i}
                  profileURI={s.studentDoc.data().profilePhoto}
                  name={s.studentDoc.data().name}
                  tasks={s.tasks.map((t) => t.data())}
                />
              ))}
            </View>
            <View style={{ flex: 1 }} />
          </>
        ) : (
          <View style={[styles.noStudentsContainer, spacing.mt2]}>
            <View style={[spacing.pa1, styles.noStudentsBox]}>
              <Text style={[typography.h4]}>{i18n.t('teacher.StudentList.NoStudents')}</Text>
            </View>
          </View>
        )}

        <View style={styles.logoutRow}>
          <BravoriButton style={[spacing.mt2]} onPress={onLogout}>
            {i18n.t('general.Logout')}
          </BravoriButton>
        </View>
      </View>
    </ComponentWithBackground>
  );
};

const styles = StyleSheet.create({
  addStudentButton: {
    backgroundColor: MAIN_ORANGE,
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  settingsButton: {
    backgroundColor: MAIN_ORANGE,
    width: 30,  // Maintain button width
    height: 30, // Maintain button height
    borderRadius: 100, // Same circular design
    alignItems: 'center', // Center the icon
    justifyContent: 'center', // Center the icon
  },
  container: {
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    height: 30,
    width: 30,
  },
  noStudentsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noStudentsBox: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
  logoutRow: {
    justifyContent: 'center',
  },
  studentWrapper: {
    flex: 1,
  },
});

export default StudentList;
