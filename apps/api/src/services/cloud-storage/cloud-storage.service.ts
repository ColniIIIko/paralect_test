/* eslint-disable import/no-extraneous-dependencies */
// Import the functions you need from the SDKs you need
import { File } from '@koa/multer';
import config from 'config';
import { initializeApp } from 'firebase/app';
//import { getStorage } from 'firebase-admin/storage';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.FIREBASE_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const upload = async (fileName: string, file: File) => {
  const fileRef = ref(storage, fileName);
  const res = await uploadBytes(fileRef, file.buffer);
  return res.metadata.fullPath;
};

const remove = async (fileName: string) => {
  const fileRef = ref(storage, fileName);
  deleteObject(fileRef);
};

const checkIfExists = async (fileName: string) => {
  const fileRef = ref(storage, fileName);
  try {
    await getDownloadURL(fileRef);
    return true;
  } catch {
    return false;
  }
};

const download = async (fileName: string) => {
  const fileRef = ref(storage, fileName);
  return getDownloadURL(fileRef);
};

export default { remove, upload, download, checkIfExists };
