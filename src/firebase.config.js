import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDIVclowjdGjtHJScV3QUqvEC95B7ZeY0g",
  authDomain: "food-delivery-8c4fd.firebaseapp.com",
  databaseURL: "https://food-delivery-8c4fd-default-rtdb.firebaseio.com",
  projectId: "food-delivery-8c4fd",
  storageBucket: "food-delivery-8c4fd.appspot.com",
  messagingSenderId: "210141963686",
  appId: "1:210141963686:web:3efd9c7891a29b02e7db67",
};
const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export { app, fireStore, storage };
