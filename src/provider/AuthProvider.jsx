import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import app from "../Firebase/firebase.config"

export const AuthContext = createContext(null);
const auth = getAuth(app)
const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState(false);

  // email/password registration
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // email/password login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  // google login
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider)
  }

  // github login
  const githubLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, GithubProvider)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  }

  const updateUserProfile = (userName, url) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName: userName, photoURL: url })
  }

  // observer user auth state 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    // stop observing while unmounting 
    return () => {
      return unsubscribe();
    }
  }, [])

  const authInfo = {
    user, register, login, logOut, updateUserProfile, loading, googleLogIn, githubLogIn,
    control, setControl
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;