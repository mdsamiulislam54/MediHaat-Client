import React, { Children, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import auth from "../../../firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(provider, auth);
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,  (currentUser) => {
      if (currentUser) {
        console.log(currentUser)
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    createUserEmailAndPassword,
    signWithGoogle,
    logOut,
    loginWithEmailPassword,
  };
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
