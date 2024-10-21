import { Alert } from 'react-native';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FIREBASE_AUTH } from 'firebaseConfig';
import { deleteAccount } from '@/components/common/WelcomeHeader/db';
import i18n from '@/translations/i18n';

const DeleteAccount = ({ firebaseUser, onLogout }) => {
  const [signOut] = useSignOut(FIREBASE_AUTH);

  const accountDelete = async () => {
    try {
      await deleteAccount(firebaseUser);
      onLogout(); // Log the user out after account deletion
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

  const handleDeleteAccount = () => {
    Alert.alert(
      i18n.t('components.UploadProfilePic.deleteAccountConfirmation'),
      i18n.t('components.UploadProfilePic.deleteAccountConfirmationMessage'),
      [
        { text: i18n.t('general.Cancel'), style: 'cancel' },
        {
          text: i18n.t('components.UploadProfilePic.deleteAccount'),
          style: 'destructive',
          onPress: accountDelete,
        },
      ]
    );
  };

  return { handleDeleteAccount };
};

export default DeleteAccount;
