import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FIREBASE_AUTH } from 'firebaseConfig';
import { deleteAccount, updateProfilePic } from '@/components/common/WelcomeHeader/db';
import { uploadAndReportProgress } from '@/utils/files'; 
import i18n from '@/translations/i18n';
import useUser from '@/commonHooks/useUser'; 
import ImageUploader, { OnImagesType } from '@/components/common/ImageUploader'; 
import ComponentWithBackground from '@/components/common/ComponentWithBackground';
const MAIN_ORANGE = '#FFA500';

const Settings = ({ navigation }) => {
  const [signOut] = useSignOut(FIREBASE_AUTH);
  const [showImageUploader, setShowImageUploader] = useState(false); 
  const { firebaseUser } = useUser();

  const handleDeleteAccount = () => {
    Alert.alert(
      i18n.t('components.UploadProfilePic.deleteAccountConfirmation'),
      i18n.t('components.UploadProfilePic.deleteAccountConfirmationMessage'),
      [
        { text: i18n.t('general.Cancel'), style: 'cancel' },
        {
          text: i18n.t('components.UploadProfilePic.deleteAccount'),
          style: 'destructive',
          onPress: async () => {
            if (firebaseUser) {
              try {
                await deleteAccount(firebaseUser);
                await signOut();
                navigation.navigate('Login');
              } catch (e) {
                const error = e as { message: string };
                if (error.message === 'auth/requires-recent-login') {
                  Alert.alert(
                    i18n.t('components.UploadProfilePic.recentLoginRequired'),
                    i18n.t('components.UploadProfilePic.recentLoginDetails'),
                    [
                      { text: i18n.t('general.Cancel') },
                      { text: i18n.t('general.Logout'), onPress: signOut },
                    ]
                  );
                } else {
                  console.error("Error deleting account:", e);
                  Alert.alert(i18n.t('general.Error'), i18n.t('general.ErrorDeletingAccount'));
                }
              }
            }
          },
        },
      ]
    );
  };

  const handleUploadProfilePicture = () => {
    setShowImageUploader(true);
  };

  const onImages = async (assets: OnImagesType[]) => {
    setShowImageUploader(false);
    if (!assets[0]?.uri) return;

    const { uris, errors } = await uploadAndReportProgress(
      [assets[0].uri],
      `/profiles/${firebaseUser.uid}`,
      console.log
    );
    
    if (uris.length > 0) {
      const fullPath = uris[0];
      try {
        await updateProfilePic(firebaseUser.uid, fullPath);
        Alert.alert(i18n.t('components.UploadProfilePic.uploadSuccess'), i18n.t('components.UploadProfilePic.imageUploadedSuccessfully'));
      } catch (error) {
        console.error("Failed to update profile picture:", error);
        Alert.alert(i18n.t('general.Error'), i18n.t('general.ErrorUpdatingProfilePicture'));
      }
    }
  };

  return (
    <ComponentWithBackground>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleUploadProfilePicture}>
        <Text style={styles.buttonText}>
          {i18n.t('components.UploadProfilePic.uploadProfilePicture')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>
          {i18n.t('components.UploadProfilePic.deleteAccount')}
        </Text>
      </TouchableOpacity>

      <ImageUploader
        onHide={() => setShowImageUploader(false)}
        title={i18n.t('components.UploadProfilePic.uploadProfilePicture')}
        multiSelect={false}
        onImages={onImages}
        visible={showImageUploader}
      />
    </View>
    </ComponentWithBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: MAIN_ORANGE,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
