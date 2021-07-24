import * as firebase from 'firebase';
import React from 'react';
import config from '../../firebase.json';

export const app = firebase.initializeApp(config);

const Auth = app.auth();

export const login = async ({email, password}) => {
  const {user} = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signup = async ({email, password, name, photoUrl}) => {
  const {user} = await Auth.createUserWithEmailAndPassword(email, password);
  const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({
    displayName: name,
    photoURL: storageUrl,
  });
  return user;
};

const uploadImage = async url => {
  const user = Auth.currentUser;
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', url, true);
    xhr.send(null);
  });
  const ref = app.storage().ref(`/profiles/${user.uid}/photo.png`);
  const snapshot = await ref.put(blob, {contentType: 'image/png'});

  blob.close();
  return await snapshot.ref.getDownloadURL();
};

export const logout = async () => {
  return await Auth.signOut();
};

// export const getCurrentUser = () => {
//   const {uid, displayName, email, photoURL} = Auth.currentUser;
//   return {uid, name: displayName, email, photoUrl: photoURL};
// };

export const UpdateUserPhoto = async url => {
  // const user = await Auth.onAuthStateChanged(value => {
  //   if (value) {
  //     console.log('signin');
  //   } else {
  //     console.log('signout');
  //   }
  // });
  const user = Auth.currentUser;
  console.log(user);
  const storageUrl = url.startsWith('https') ? url : await uploadImage(url);
  console.log('storageurl', storageUrl);
  await user.updateProfile({photoURL: storageUrl});
  return {photoUrl: user.photoURL};
};
