import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import i18n from '@/translations/i18n';
import { deleteAccount } from '@/components/common/WelcomeHeader/db';
import Icon from '@/components/common/Icon';

type SettingsProps = {
  firebaseUser: any;
  onLogout: () => void;
  onUploadProfilePicture: () => void;
};

const Settings: React.FC<SettingsProps> = ({
  firebaseUser,
  onLogout,
  onUploadProfilePicture,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const showSettingsActionSheet = () => {
    showActionSheetWithOptions(
      {
        title: i18n.t('components.UploadProfilePic.userProfile'),
        options: [
          i18n.t('components.UploadProfilePic.uploadProfilePicture'),
          i18n.t('components.UploadProfilePic.deleteAccount'),
          i18n.t('general.Cancel'),
        ],
        destructiveButtonIndex: 1,
        destructiveColor: 'red',
        cancelButtonIndex: 2,
        cancelButtonTintColor: 'gray',
      },
      (ix) => {
        if (ix === 0) {
          onUploadProfilePicture();
        }
        if (ix === 1) {
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
                      onLogout();
                    } catch (e) {
                      const error = e as { message: string };
                      if (error.message === 'auth/requires-recent-login') {
                        Alert.alert(
                          i18n.t('components.UploadProfilePic.recentLoginRequired'),
                          i18n.t('components.UploadProfilePic.recentLoginDetails'),
                          [
                            { text: i18n.t('general.Cancel') },
                            { text: i18n.t('general.Logout'), onPress: onLogout },
                          ]
                        );
                      }
                    }
                  }
                },
              },
            ]
          );
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={showSettingsActionSheet}>
      <Icon name="SettingsWhite" width={23} height={23} />
    </TouchableOpacity>
  );
};

export default Settings;
