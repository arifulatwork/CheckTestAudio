import { sample } from 'lodash';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';

import { MAIN_BLUE, MAIN_ORANGE } from '@/Colors';
import typography from '@/commonStyles/Typography';
import { getFileFromFirebase } from '@/utils/files';

type Props = {
  firebaseUri?: string;
  style?: StyleProp<ViewStyle>;
  name?: string;
};

const colors = [MAIN_ORANGE, MAIN_BLUE];

const ProfilePic = ({ firebaseUri, style, name }: Props) => {
  const [downloadURI, setDownloadURI] = useState<string>();
  const [initialsColor] = useState(sample(colors));

  const [downloadProgress, setDownloadProgress] = useState(0);

  const onDownloadProgress = (pct: number) => {
    setDownloadProgress(pct * 100);
    if (pct === 1) setDownloadProgress(0);
  };

  useEffect(() => {
    if (!firebaseUri) return;
    getFileFromFirebase(firebaseUri, onDownloadProgress).then(setDownloadURI);
  }, [firebaseUri]);

  return (
    <View style={[styles.container, style]}>
      {downloadProgress > 0 ? (
        <View style={styles.downloadProgress}>
          <View style={[styles.progressInner, { width: `${downloadProgress}%` }]} />
        </View>
      ) : null}
      {firebaseUri ? (
        <Image resizeMode="cover" style={styles.image} source={{ uri: downloadURI }} />
      ) : (
        <View style={[styles.initials, { backgroundColor: initialsColor }]}>
          <Text style={[typography.bold, styles.initialsText]}>{name?.split('')[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
  },
  image: {
    borderRadius: 1000,
    width: '100%',
    height: '100%',
  },
  initials: {
    borderRadius: 1000,
    width: '100%',
    height: '100%',
    backgroundColor: MAIN_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 40,
  },
  downloadProgress: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 1000,
    overflow: 'hidden',
  },
  progressInner: {
    height: '100%',
    backgroundColor: 'rgba(180,180,180,0.5)',
  },
});

export default ProfilePic;
