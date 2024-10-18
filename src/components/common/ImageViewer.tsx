import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import ImageView from 'react-native-image-viewing';

import Spinner from './Spinner';

import { getFileFromFirebase } from '@/utils/files';

type Props = {
  imageUris: string[];
  isLocal?: boolean;
  visible: boolean;
  startAtIndex?: number;
  onClose: () => void;
};

const ImageViewer = ({ imageUris, isLocal = false, visible, onClose, startAtIndex = 0 }: Props) => {
  const [localUris, setLocalUris] = useState(isLocal ? imageUris : []);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isLocal) {
      setLocalUris(imageUris);
    }
    if (isLocal || !visible) return;
    Promise.all(
      imageUris.map((uri) => getFileFromFirebase(uri, () => setIsDownloading(true)))
    ).then((images) => {
      setLocalUris(images);
      setIsDownloading(false);
    });
  }, [imageUris, isLocal, visible]);

  if (isDownloading)
    return (
      <View style={styles.loadingContainer}>
        <Spinner />
      </View>
    );
  return (
    <ImageView
      images={localUris.map((uri) => ({ uri }))}
      imageIndex={startAtIndex}
      visible={visible}
      onRequestClose={onClose}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
});

export default ImageViewer;
