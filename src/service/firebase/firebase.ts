/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes,deleteObject
 } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAh7wxm9TVMVatDqgwp22L9COqck3WSzBQ",
  authDomain: "shopinufb.firebaseapp.com",
  projectId: "shopinufb",
  storageBucket: "shopinufb.appspot.com",git add
  messagingSenderId: "1043664494543",
  appId: "1:1043664494543:web:09b05cc00e8cc912517cba",
  measurementId: "G-FBEL3HSXWJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireBaseFn = {
  uploadToStorage: async (
    file: File,
    fallBackUrl: string = "https://firebasestorage.googleapis.com/v0/b/shopinufb.appspot.com/o/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg?alt=media&token=a1ec7eae-fbc7-4306-b7ec-bb2e6ad3c91c"
  ) => {
    try {
      const typeFile = `.${file.type.split("/")[1]}`;
      const fileName = `picture_${Math.ceil(
        Date.now() * Math.random()
      )}${typeFile}`;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const res = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(res.ref)
        .then((res) => res)
        .catch((err) => (console.log(err), fallBackUrl));
      return url;
    } catch (err) {
      return fallBackUrl;
    }
  },
};


// Hàm xóa ảnh cũ
export const deleteImage = async (url: string) => {
  try {
    const storage = getStorage(app);
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
    console.log('Image deleted successfully');
  } catch (err) {
    console.error('Error deleting image:', err);
  }
};
