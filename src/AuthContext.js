import React, { useMemo, useState, useEffect } from "react"
import  app from './firebase'
import { browserLocalPersistence, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";

export const AuthContext = React.createContext()

export const auth = initializeAuth(app, {
 persistence: [indexedDBLocalPersistence, browserLocalPersistence]
}
);

export function AuthProvider({ children }) {

const [currentUser, setCurrentUser] = useState(null)

  useEffect(() =>{

    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unsubscribe;
  }, [])

  const value = useMemo(() => ({ currentUser }), [currentUser])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}