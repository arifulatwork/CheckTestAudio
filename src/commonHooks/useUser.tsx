import { doc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from 'firebaseConfig';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { User } from '@/types/User';

const getBravoriUser = (
  uid: string,
  updateUser: (user: User | undefined) => void,
  setLoading: (bool: boolean) => void
) => {
  setLoading(true);
  return onSnapshot(doc(FIREBASE_DB, 'users', uid), (doc) => {
    if (doc.exists()) {
      updateUser(doc.data() as User);
    } else updateUser(undefined);
    setLoading(false);
  });
};

const useUser = () => {
  const [user, loading, error] = useAuthState(FIREBASE_AUTH);
  const [bravoriUser, setBravoriUser] = useState<User | undefined>();
  const [bravoriUserLoading, setBravoriUserLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setBravoriUserLoading(true);
      return;
    }
    if (!user) {
      setBravoriUserLoading(false);
      return;
    }

    const unsubscribe = getBravoriUser(user.uid, setBravoriUser, setBravoriUserLoading);
    return () => {
      // explicit cleanup code
      unsubscribe();
    };
  }, [user, loading]);

  return {
    bravoriUser,
    firebaseUser: user,
    loading: bravoriUserLoading,
    error,
  };
};

export default useUser;
