import * as firebase from 'firebase';
import config from '../../firebase.json';
import 'firebase/firestore';

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

export const getCurrentUser = () => {
  const {uid, displayName, email, photoURL} = Auth.currentUser;
  return {uid, name: displayName, email, photoUrl: photoURL};
};

export const updateUserPhoto = async photoUrl => {
  const user = Auth.currentUser;
  const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({photoURL: storageUrl});
  return {name: user.displayName, email: user.email, photoUrl: user.photoURL};
};

export const DB = firebase.firestore();

export const createMeal = async meals => {
  const {uid} = getCurrentUser();
  const newMeal = {
    id: uid,
    meals: meals,
    createdAt: Date.now(),
  };
  await DB.collection('meals').doc(uid).set(newMeal);
  return uid;
};

export const addComment = async (content, postId) => {
  const user = getCurrentUser();
  console.log('user', user);
  const postRef = await DB.collection('sns').doc(postId);
  const test = await postRef.get();
  const {comment} = await test.data();
  const id = postRef.collection('comment').doc().id;
  const commentValue = {
    id,
    content: content,
    name: user.name,
    uid: user.uid,
    createdAt: Date.now(),
    profileURL: user.photoUrl,
  };
  await postRef.collection('comment').doc().set(commentValue);
  const commentCount = comment + 1;
  await postRef.update({comment: commentCount});
};

export const createPost = async ({content, photoUrl}) => {
  const user = getCurrentUser();
  const newPostRef = DB.collection('sns').doc();
  const id = newPostRef.id;
  const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadSNSImage(photoUrl, id);
  const newPost = {
    uid: user.uid,
    name: user.name,
    email: user.email,
    profileURL: user.photoUrl,
    id,
    content,
    comment: 0,
    createdAt: Date.now(),
    photoURL: storageUrl,
    like: 0,
  };
  await newPostRef.set(newPost);
  return id;
};

const uploadSNSImage = async (url, postId) => {
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
  const ref = app.storage().ref(`/sns/${postId}/photo.png`);
  const snapshot = await ref.put(blob, {contentType: 'image/png'});

  blob.close();
  return await snapshot.ref.getDownloadURL();
};
