import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOAQh9vWmkqksz2Ejkx9mK0cu31ae3Bo4",
  authDomain: "foodi-d43a1.firebaseapp.com",
  projectId: "foodi-d43a1",
  storageBucket: "foodi-d43a1.appspot.com",
  messagingSenderId: "260178721835",
  appId: "1:260178721835:web:2c4b43fb847ac24211be6e",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
