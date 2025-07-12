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
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosinstanceCall = axiosinstance();

  const createUserEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log(currentUser)

        try {
          const res = await axiosinstanceCall.get(`/user/${currentUser.email}`);
         
          setRole(res.data.role);
         
        } catch (error) {
          if (error.response?.status === 404) {
            // New Google user — create entry
            const newUser = {
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              role: ["user"],
            };
            const createRes = await axiosinstance.post("/create-user", newUser);
            setRole(createRes.data.role);
          } else {
            console.error("Error fetching user:", error);
          }
        }

         setUser(currentUser);
      } else {
        setUser(null);
        setRole([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUserEmailAndPassword,
    signWithGoogle,
    logOut,
    loginWithEmailPassword,
    setUser,
    setRole,
    role
  };



  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
