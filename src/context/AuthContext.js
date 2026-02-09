import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const signup = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile
        await updateProfile(user, { displayName: name });

        // Create user doc in firestore
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name,
            email,
            role: 'user', // default role
            createdAt: new Date().toISOString()
        });

        return userCredential;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        console.log("AuthProvider useEffect running");

        // Safety timeout: stop loading after 5 seconds no matter what
        const timeout = setTimeout(() => {
            if (loading) {
                console.warn("Auth check timed out, forcing loading to false");
                setLoading(false);
            }
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("onAuthStateChanged fired, user:", user?.uid);
            setCurrentUser(user);
            setLoading(false); // Set loading to false as soon as we know the auth state
            console.log("setLoading(false) called immediately");

            if (user) {
                // Fetch additional user data in the background
                getDoc(doc(db, 'users', user.uid))
                    .then((userDoc) => {
                        if (userDoc.exists()) {
                            console.log("User data fetched successfully");
                            setUserData(userDoc.data());
                        }
                    })
                    .catch((err) => console.error("Error fetching user data:", err));
            } else {
                setUserData(null);
            }
        });

        return () => {
            unsubscribe();
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = {
        currentUser,
        userData,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
