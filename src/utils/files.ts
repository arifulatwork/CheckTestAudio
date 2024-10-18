import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { FIREBASE_STORAGE } from 'firebaseConfig';
import { sum } from 'lodash';

export type UpdateProgress = (pct: number, done: boolean) => void;

export const getFileType = (uri: string) => {
  const split = uri.split('.');
  return split[split.length - 1];
};
export const getFilenameFromURI = (uri: string) => {
  const lastPart = uri.replaceAll('%2', '/').split('/').pop();
  const splitFromHere = lastPart?.lastIndexOf('?');
  return (lastPart || '').slice(0, (splitFromHere || -1) > -1 ? splitFromHere : undefined);
};
export const getFileAsBlob = async (uri: string) => {
  const originalUri = uri;
  const fileName = uri.substring(uri.lastIndexOf('/') + 1);
  // Workaround see https://github.com/facebook/react-native/issues/27099
  const newUri = `${FileSystem.documentDirectory}resumableUploadManager-${fileName}.toupload`;
  await FileSystem.copyAsync({ from: originalUri, to: newUri });
  const response = await fetch(newUri);
  const blobData = await response.blob();
  return new Blob([blobData], { type: 'image/jpeg' });
};

export const getDownloadURLFromFirebaseRelativeUri = async (uri: string) => {
  const imgRef = ref(FIREBASE_STORAGE, uri);
  const url = await getDownloadURL(imgRef);
  return url;
};

export type FileDownloadProgressFunction = (percentageComplete: number) => void;

export const saveFileLocally = async (uri: string, onProgress: FileDownloadProgressFunction) => {
  const fileName = getFilenameFromURI(uri);

  const downloadResumable = FileSystem.createDownloadResumable(
    uri,
    (FileSystem.cacheDirectory || '') + fileName,
    {},
    (downloadProgress) => {
      onProgress(downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite);
    }
  );

  try {
    const result = await downloadResumable.downloadAsync();
    return result;
  } catch (e) {
    // download error
    console.log(e);
    throw new Error('Filesystem error');
  }
};

export const getFileURIFromCache = async (uri: string) => {
  try {
    const localURI = await AsyncStorage.getItem(uri);
    return localURI;
  } catch (e) {
    console.error(e);
  }
};

const saveFileURIToCache = async (originalUri: string, localUri: string) => {
  await AsyncStorage.setItem(originalUri, localUri);
};

export const getFileFromFirebase = async (
  uri: string,
  onProgress: FileDownloadProgressFunction
) => {
  const localFile = await getFileURIFromCache(uri);
  try {
    if (localFile) {
      // check if local file exists
      const info = await FileSystem.getInfoAsync(localFile);
      if (info.exists) {
        return localFile;
      }
    }
  } catch (e) {
    console.log('not able to read file from local, resulting to dowload again');
  }

  const downloadURL = await getDownloadURLFromFirebaseRelativeUri(uri);
  const result = await saveFileLocally(downloadURL, onProgress);
  if (!result) throw new Error("Couldn't download file");
  await saveFileURIToCache(uri, result.uri);
  return result.uri;
};

const sizeIsLessThanMB = (blob: Blob, maxSizeMB: number) => {
  return blob.size / 1048576 < maxSizeMB;
};

const compressImage = async (uri: string) => {
  // todo: implementation
  return { uri };
};

export const checkFileSizeAndGetBlob = async (uri: string) => {
  const imageBlob = await getFileAsBlob(uri);
  if (sizeIsLessThanMB(imageBlob, 2)) {
    // carry on
    return imageBlob;
  } else {
    const imageResult = await compressImage(uri);
    const compressedBlob = await getFileAsBlob(imageResult.uri);
    const smallerThanMaxSize = sizeIsLessThanMB(compressedBlob, 2);
    if (!smallerThanMaxSize) {
      throw new Error('image-too-large');
    }
    return compressedBlob;
  }
};

const getUploadTask = (blob: Blob, filePath: string) => {
  const imgRef = ref(FIREBASE_STORAGE, filePath);
  return uploadBytesResumable(imgRef, blob);
};

export const uploadAndReportProgress = async (
  fileUris: string[],
  pathRoot: string,
  progressCallback: UpdateProgress
): Promise<{ uris: string[]; errors: string[] }> => {
  const errors: string[] = [];
  const blobs = await Promise.all(
    fileUris
      .map(async (uri) => {
        const path = `${pathRoot}/${randomUUID()}.${getFileType(uri)}`;
        try {
          const blob = await checkFileSizeAndGetBlob(uri);
          return {
            path,
            blob,
          };
        } catch (e) {
          console.log(e);
          errors.push(uri);
        }
      })
      .filter((b) => b !== undefined) as Promise<{ path: string; blob: Blob }>[]
  );

  const uploadTasks = blobs.map((blob) => getUploadTask(blob.blob, blob.path));

  let totalBytes = 0;
  const bytesTransferred = new Array(uploadTasks.length).fill(0);
  const tasks = uploadTasks.map(async (task, ix) => {
    totalBytes += task.snapshot.totalBytes;
    bytesTransferred[ix] = task.snapshot.bytesTransferred;

    task.on('state_changed', (snap) => {
      bytesTransferred[ix] = snap.bytesTransferred;

      if (snap.state === 'error') {
        bytesTransferred[ix] = snap.totalBytes;
      }
      progressCallback((sum(bytesTransferred) / totalBytes) * 100, false);
    });
    try {
      const result = { uri: fileUris[ix], task: await task };
      return result;
    } catch (e) {
      console.log('upload error', e);
      return { uri: fileUris[ix], task: task.snapshot };
    }
  });

  const results = await Promise.all(tasks);
  progressCallback(100, true);

  errors.push(...results.filter((r) => r.task.state === 'error').map((r) => r.uri));
  const uris = results.filter((r) => r.task.state === 'success').map((r) => r.task.ref.fullPath);

  return { errors, uris };
};
