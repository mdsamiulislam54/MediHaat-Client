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
import axiosinstance from "../../hooks/axiosInstance/axiosinstance";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState([])
  const [loading, setLoading] = useState(true);
  const axiosInstance = axiosinstance()

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
    return signOut(auth)
    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,  async (currentUser) => {
      if (currentUser) {
        const res = await axiosInstance.get(`/user/${currentUser.email}`)
        setRole(res.data.role)
        console.log(res.data)
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
    setUser
  };

 
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
