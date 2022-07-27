import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

// Used for monitoring transaction status
export const monitorTransaction = (documentID: string, snapshot, error) => {
  const docRef = doc(db, "transactions", documentID);
  return onSnapshot(docRef, snapshot, error);
};

// Used for fetching a copy of the user's data
export const fetchData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  return await getDoc(docRef);
};

// <========== Used for monitoring whether user is llogged in ==========>
const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // Used for signing out
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const Logout = async () => signOut(auth).then(clear);

  // Listen for firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    Logout,
  };
}
// <========== End used for monitoring whether user is llogged in ==========>
