import { useActionSheet } from '@expo/react-native-action-sheet';
import { randomUUID } from 'expo-crypto';
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';

import i18n from '@/translations/i18n';

export type OnImagesType = (asset: { uri: string; id: string }[]) => void;

type Props = {
  onImages: OnImagesType;
  type: 'camera' | 'library';
  multiSelect?: boolean;
  title?: string;
  onHide: () => void;
};

const Inner = ({ type, onImages, multiSelect = true }: Props) => {
  /* NOTE : https://docs.expo.dev/versions/latest/sdk/imagepicker/#imagepickergetpendingresultasync */

  const [cameraPermissionStatus, requestCameraPermission] = useCameraPermissions();
  const [libraryPermissionStatus, requestLibraryPermission] = useMediaLibraryPermissions();

  const [isLaunched, setIsLaunched] = useState(false);

  const permissionGranted = useMemo(() => {
    if (type === 'camera') return cameraPermissionStatus?.granted;
    if (type === 'library') return libraryPermissionStatus?.granted;
  }, [type, cameraPermissionStatus, libraryPermissionStatus]);

  if (type === 'camera' && !cameraPermissionStatus?.granted) {
    requestCameraPermission();
  }

  if (type === 'library' && !libraryPermissionStatus?.granted) {
    requestLibraryPermission();
  }

  if (!permissionGranted)
    return (
      <View>
        <Text>{i18n.t('components.ImageUploader.waitingForPermissions')}</Text>
      </View>
    );

  if (permissionGranted && !isLaunched) {
    setIsLaunched(true);
    if (type === 'camera') {
      launchCameraAsync().then(
        (result) => {
          onImages(
            (result.assets || []).map((r) => ({ uri: r.uri, id: r.assetId || randomUUID() }))
          );
          setIsLaunched(false);
        },
        (reject) => {}
      );
    }
    if (type === 'library') {
      launchImageLibraryAsync({
        allowsMultipleSelection: multiSelect,
        mediaTypes: MediaTypeOptions.Images,
      }).then(
        (result) => {
          onImages(
            (result.assets || []).map((r) => ({ uri: r.uri, id: r.assetId || randomUUID() }))
          );
          setIsLaunched(false);
        },
        (reject) => {}
      );
    }
  }
};

type WrapperProps = {
  visible: boolean;
};

const ImageUploader = ({
  visible,
  onImages,
  multiSelect,
  onHide,
  title = i18n.t('components.ImageUploader.imageNote'),
}: WrapperProps & Pick<Props, 'onImages' | 'multiSelect' | 'title' | 'onHide'>) => {
  const [type, setType] = useState<Props['type']>();

  const { showActionSheetWithOptions } = useActionSheet();

  const pushImages: OnImagesType = (pl) => {
    onImages(pl);
    onHide();
  };

  useEffect(() => {
    setType(undefined);
    if (!visible) return;
    const options = [
      i18n.t('components.ImageUploader.takePicture'),
      i18n.t('components.ImageUploader.cameraRoll'),
      i18n.t('general.Cancel'),
    ];

    showActionSheetWithOptions(
      {
        title,
        options,
        cancelButtonIndex: 2,
        cancelButtonTintColor: 'red',
      },
      (selectedIndex?: number) => {
        setType(undefined);
        switch (selectedIndex) {
          case 0:
            setType('camera');
            break;
          case 1:
            setType('library');
            break;
          case 2:
            setType(undefined);
            onHide();
            break;
        }
      }
    );
  }, [visible]);

  if (!visible || !type) return null;

  return <Inner onHide={onHide} onImages={pushImages} type={type} multiSelect={multiSelect} />;
};

export default ImageUploader;
