import { FirebaseError } from 'firebase/app';
import { User as FirebaseUser } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { updateProfilePic } from './db';
import ProfilePic from '../ProfilePic';
import Spinner from '../Spinner';
import UploadProfilePic from '../UploadProfilePic';

import typography from '@/commonStyles/Typography';
import i18n from '@/translations/i18n';
import { User } from '@/types/User';

type Props = {
  user: User | undefined;
  firebaseUser: FirebaseUser;
  style?: StyleProp<ViewStyle>;
  onLogout: () => void;
};

const WelcomeHeader = ({ user, style, firebaseUser, onLogout }: Props) => {
  const [loading, setLoading] = useState(false);
  const onComplete = async (uri: string) => {
    if (!firebaseUser.uid) return;
    try {
      await updateProfilePic(firebaseUser.uid, uri);
    } catch (e) {
      const er = e as FirebaseError;
      Alert.alert(er.message);
    }
    setLoading(false);
  };
  if (!user || !firebaseUser) return null;

  return (
    <View style={[styles.container, style]}>
      <View style={{ flex: 3 }}>
        <Text style={[typography.h2, typography.left, { fontSize: 27 }]}>
          {i18n.t('general.Welcome')} {user.name}!
        </Text>
      </View>
      <View style={[styles.picContainer]}>
        <UploadProfilePic
          style={styles.editPic}
          firebaseUser={firebaseUser}
          onUploadStart={() => setLoading(true)}
          onComplete={onComplete}
          onLogout={onLogout}
        />
        {!loading ? (
          <ProfilePic style={styles.pic} name={user.name} firebaseUri={user.profilePhoto} />
        ) : (
          <Spinner style={styles.pic} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pic: {
    width: 70,
    height: 70,
  },
  editPic: {
    position: 'absolute',
    zIndex: 1,
    top: -5,
    right: -5,
  },
});

export default WelcomeHeader;
