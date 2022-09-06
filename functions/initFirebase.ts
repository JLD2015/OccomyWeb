import { FirebaseOptions, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config: FirebaseOptions = {
  apiKey: "AIzaSyAMGmuMTUZ34PxaNTQ3QG_Dh7JZxr5LQfY",
  authDomain: "occomy.firebaseapp.com",
  projectId: "occomy",
  storageBucket: "occomy.appspot.com",
  messagingSenderId: "791072514158",
  appId: "1:791072514158:web:52bff4cb9f02dad76c067f",
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(config);
export const firebaseAuth = getAuth(firebaseApp);
