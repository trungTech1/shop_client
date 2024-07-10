import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes,deleteObject
 } from "firebase/storage";

 const firebaseConfig = {
  apiKey: "AIzaSyDQyIq04aIMN8AiaSsl9lYEjEqXt0FJTwY",
  authDomain: "vinmartshop-f01e1.firebaseapp.com",
  projectId: "vinmartshop-f01e1",
  storageBucket: "vinmartshop-f01e1.appspot.com",
  messagingSenderId: "159052663427",
  appId: "1:159052663427:web:d48cda544a74265c10e9b6",
  measurementId: "G-41RZZ6THRC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireBaseFn = {
  uploadToStorage: async (
    file: File,
    fallBackUrl: string = "https://firebasestorage.googleapis.com/v0/b/vinmartshop-f01e1.appspot.com/o/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg?alt=media&token=d5c367bd-229f-4668-99a9-df50c035c70f"
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
