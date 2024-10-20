import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import UploadProfilePic from '@/components/common/UploadProfilePic';
import { FirebaseError } from 'firebase/app';
import { User as FirebaseUser } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FIREBASE_AUTH } from 'firebaseConfig';
import i18n from '@/translations/i18n';
import BravoriButton from '@/components/common/BravoriButton';

type Props = {
  firebaseUser: FirebaseUser;
  onLogout: () => void;
};

const Settings = ({ firebaseUser, onLogout }: Props) => {
  const [signOut] = useSignOut(FIREBASE_AUTH);

  const handleProfilePicComplete = (uri: string) => {
    // Handle profile picture upload completion
    console.log(`Profile picture updated: ${uri}`);
    Alert.alert(i18n.t('components.UploadProfilePic.uploadSuccess')); // Optionally alert success
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      i18n.t('components.UploadProfilePic.deleteAccountConfirmation'),
      i18n.t('components.UploadProfilePic.deleteAccountConfirmationMessage'),
      [
        { text: i18n.t('general.Cancel'), style: 'cancel' },
        {
          text: i18n.t('components.UploadProfilePic.deleteAccount'),
          style: 'destructive',
          onPress: async () => {
            try {
              // Attempt to delete the account
              await signOut(); // Ensure user is signed out first
              console.log("Account deleted");
              onLogout(); // Call logout function
            } catch (e) {
              const error = e as FirebaseError;
              Alert.alert(error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <UploadProfilePic
        firebaseUser={firebaseUser}
        onComplete={handleProfilePicComplete}
        onLogout={onLogout}
      />
      <BravoriButton style={styles.deleteButton} onPress={handleDeleteAccount}>
        {i18n.t('components.UploadProfilePic.deleteAccount')}
      </BravoriButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  deleteButton: {
    marginTop: 20,
  },
});

export default Settings;
