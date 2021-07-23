import React, {useState, createContext} from 'react';

const GoogleContext = createContext({
  googleUser: {email: null, uid: null},
  googleDispatch: () => {},
});

const GoogleProvider = ({children}) => {
  const [googleUser, setGoogleUser] = useState({});
  const googleDispatch = ({email, uid}) => {
    setGoogleUser({email, uid});
  };
  const value = {googleUser, googleDispatch};
  return (
    <GoogleContext.Provider value={value}>{children}</GoogleContext.Provider>
  );
};

export {GoogleContext, GoogleProvider};
