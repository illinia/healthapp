import React, {useState, createContext} from 'react';

const UserContext = createContext({
  user: {},
  userDispatch: () => {},
});

const UserProvider = ({children}) => {
  const [user, setUser] = useState({});
  const userDispatch = children => {
    setUser(children._user);
  };
  const value = {user, userDispatch};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export {UserContext, UserProvider};
