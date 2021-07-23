import React, {useEffect, useState, useContext} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {UserContext, ProgressContext} from '../context';

const GoogleButton = () => {
  const {spinner} = useContext(ProgressContext);
  const {userDispatch} = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '364375446707-3ro5r3sil60bg843jvv5o1mfhhgg43fl.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onAuthStateChanged(user) {
    setUserInfo(user);
    if (user) {
      setLoggedIn(true);
      userDispatch(user);
    } else {
      setLoggedIn(false);
      userDispatch({});
    }
  }

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      spinner.start();
      setLoggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      }
    } finally {
      spinner.stop();
    }
  };

  return (
    <>
      <GoogleSigninButton
        style={{
          width: '100%',
          height: 50,
        }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={_signIn}
      />

      {/* {loggedIn && <Button onPress={signOut} title="Google LogOut" />} */}
    </>
  );
};

const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    auth().signOut();
  } catch (error) {
    console.error(error);
  }
};

export default GoogleButton;
export {signOut};
