// src/app/AuthProvider.js
"use client";

import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase'; // Import the auth object
import { onAuthStateChanged } from "firebase/auth"; // Import the auth state listener

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User found:', user);
      } else {
        console.log('No user found');
      }
      setUser (user); // Set user state based on authentication status
      setLoading(false); // Set loading to false once user state is determined
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;