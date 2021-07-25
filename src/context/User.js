import React, {useState, createContext} from 'react';

const UserContext = createContext({
  user: {email: null, uid: null},
  userDispatch: () => {},
});

const UserProvider = ({children}) => {
  const [user, setUser] = useState({});
  const userDispatch = ({email, uid}) => {
    setUser({email, uid});
  };
  const value = {user, userDispatch};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export {UserContext, UserProvider};
