import { useActionSheet } from '@expo/react-native-action-sheet';
import { User as FirebaseUser } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle, Alert } from 'react-native';

import ImageUploader, { OnImagesType } from '../ImageUploader';
import { deleteAccount } from '../WelcomeHeader/db';

import { EditIcon } from '@/components/icons/uiElements/EditIcon';
import i18n from '@/translations/i18n';
import track from '@/utils/analytics';
import { uploadAndReportProgress } from '@/utils/files';

const EditButton = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.edit}>
    <EditIcon width="100%" height="100%" />
  </TouchableOpacity>
);

type Props = {
  style?: StyleProp<ViewStyle>;
  firebaseUser: FirebaseUser;
  onUploadStart?: () => void;
  onComplete: (uri: string) => void;
  onLogout: () => void;
};

const UploadProfilePic = ({ style, firebaseUser, onComplete, onUploadStart, onLogout }: Props) => {
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const accountDelete = async () => {
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
  };

  useEffect(() => {
    if (!showActionSheet) return;

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
        setShowActionSheet(false);

        if (ix === 0) {
          setShowImageUploader(true);
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
                onPress: () => accountDelete(),
              },
            ]
          );
        }
      }
    );
  }, [showActionSheet]);

  const onImages: OnImagesType = async (assets) => {
    setShowImageUploader(false);
    if (!assets[0]?.uri) return;
    if (onUploadStart) onUploadStart();
    const { uris, errors } = await uploadAndReportProgress(
      [assets[0].uri],
      `/profiles/${firebaseUser.uid}`,
      console.log
    );
    console.log(errors);
    const fullPath = uris[0];
    onComplete(fullPath);
    track({ name: 'Change Profile Picture' });
  };

  return (
    <View style={[style]}>
      <EditButton onPress={() => setShowActionSheet(true)} />

      <ImageUploader
        onHide={() => setShowImageUploader(false)}
        title={i18n.t('components.UploadProfilePic.uploadProfilePicture')}
        multiSelect={false}
        onImages={onImages}
        visible={showImageUploader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  edit: {
    width: 25,
    height: 25,
  },
});

export default UploadProfilePic;
