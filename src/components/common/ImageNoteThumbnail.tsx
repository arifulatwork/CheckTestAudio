import { useActionSheet } from '@expo/react-native-action-sheet';
import { PropsWithChildren, useEffect, useState } from 'react';
import { StyleProp, ViewStyle, StyleSheet, Pressable, ImageBackground, View } from 'react-native';

import { getFileFromFirebase } from '@/utils/files';

type Props = {
  uri: string;
  onPressAction: 'none' | 'preview' | 'previewOrRemove';
  isRemoteFile?: boolean;
  onPreview?: () => void;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
};

const ImageNoteThumbnail = ({
  style,
  uri,
  onPressAction,
  children,
  onPreview,
  onRemove,
  isRemoteFile = true,
}: PropsWithChildren<Props>) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [url, setUrl] = useState<string>();
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    if (!isRemoteFile) {
      setUrl(uri);
      return;
    }
    getFileFromFirebase(uri, (pct) => setDownloadProgress(pct)).then(setUrl);
  }, [uri]);

  const onPress = () => {
    if (onPressAction === 'none') return;
    if (onPressAction === 'preview') {
      onPreview && onPreview();
      return;
    }

    showActionSheetWithOptions(
      {
        options: ['Preview', 'Remove'],
        destructiveButtonIndex: 1,
        destructiveColor: 'red',
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            onPreview && onPreview();
            break;
          case 1:
            onRemove && onRemove();
            break;
        }
      }
    );
  };

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <ImageBackground imageStyle={styles.imageStyle} style={styles.image} source={{ uri: url }}>
        <View
          style={[
            styles.progress,
            {
              width: `${downloadProgress * 100}%`,
              display: downloadProgress > 0 && downloadProgress < 1 ? 'flex' : 'none',
            },
          ]}
        />
        {children}
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    maxWidth: '25%',
    padding: 5,
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 10,
  },
  progress: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(150,150,150,0.5)',
    zIndex: 1,
  },
});

export default ImageNoteThumbnail;
