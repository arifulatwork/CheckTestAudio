import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import NavigationError from './components/NavigationError';
import DevPlayground from '../screens/dev/DevPlayground';
import PrivacyPolicy from '../screens/welcome/PrivacyPolicy';
import ResetPassword from '../screens/welcome/ResetPassword';

import useUser from '@/commonHooks/useUser';
import i18n from '@/translations/i18n';
import track, { init } from '@/utils/analytics';
import StudentTaskView from '@/views/screens/student/TaskView/TaskView';
import AddStudent from '@/views/screens/teacher/AddStudent/AddStudent';
import StudentList from '@/views/screens/teacher/StudentList/StudentList';
import Login from '@/views/screens/welcome/Login';
import Register from '@/views/screens/welcome/Register';

export type PageParams = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  StudentTaskView: undefined;
  StudentList: undefined;
  NavigationError: undefined;
  AddStudent: undefined;
  TaskDetails: { taskId: string };
  TeacherTaskDetails: { taskId: string; studentName: string };
  TeacherTaskView: { studentId: string; updateAt?: number };
  ApproveTasks: undefined;
  Practice: { taskId: string };
  AddTask: { studentId: string };
  PrivacyPolicy: undefined;
  Rewards: undefined;
  StickerGain: {
    sessionsCompleted: number;
    totalSessions: number;
    rewardId: string;
    taskId: string;
  };
  DevPlayground: undefined;
};

const trackPageView = (screenName?: string) => {
  if (!screenName) return;
  track({ name: 'Page View', payload: { screenName } });
};

const Stack = createNativeStackNavigator<PageParams>();
const Navigation = () => {
  const { firebaseUser, bravoriUser, error, loading } = useUser();

  useEffect(() => {
    if (loading) return;
    SplashScreen.hideAsync().then();
    if (!bravoriUser) {
      init(firebaseUser?.uid);
    } else {
      init(firebaseUser?.uid, { userType: { value: bravoriUser.userType } });

      if (bravoriUser.language) {
        i18n.locale = bravoriUser.language;
      }
    }
  }, [firebaseUser, bravoriUser, loading]);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenListeners={{
          focus(e) {
            trackPageView(e.target?.split('-')[0]);
          },
        }}
        screenOptions={{ headerShown: false }}>
        {/* Comment / Uncomment this line to enable a screen to test pure components */}
        {/* <Stack.Screen name="DevPlayground" component={DevPlayground} /> */}

        {!firebaseUser || error ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            </Stack.Group>
          </Stack.Group>
        ) : null}

        {bravoriUser?.userType === 'Student' ? (
          <>
            <Stack.Screen name="StudentTaskView" component={StudentTaskView} />
          </>
        ) : null}

        {bravoriUser?.userType === 'Teacher' ? (
          <>
            <Stack.Group>
              <Stack.Screen name="StudentList" component={StudentList} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="AddStudent" component={AddStudent} />
            </Stack.Group>
          </>
        ) : null}

        {firebaseUser && !bravoriUser ? (
          <Stack.Screen name="NavigationError" component={NavigationError} />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
