import React, { createContext, useState, useEffect,useReducer } from "react";
import { auth, createUserDocument } from "../firebase";
import reducer from './../Reducer/index'
export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dni,dispatch]=useReducer(reducer,null)
  // const [sus, setSus] = useState(null);
  //unsubscribeFromAuth = null;
  useEffect(() => {
    const fetch = async () => {
      auth.onAuthStateChanged(async user => {
        if (user) {
          const userRef = await createUserDocument(user);
          console.log(userRef);
          userRef.onSnapshot(snap => {
            console.log(snap);
            setUser(snap.data());
          });
        } else setUser(user);
      });
    };

    fetch();
  }, []);
  console.log(dni) 
  return <UserContext.Provider value={[user,dni,dispatch]}>{children}</UserContext.Provider>;
};

export default UserProvider;
