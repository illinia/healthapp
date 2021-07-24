import React, {useContext, useState} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {Button, Image} from '../components';
import {logout, UpdateUserPhoto} from '../utils/firebase';
import {UserContext, ProgressContext} from '../context';
import {signOut} from '../utils/googleButton';
import {Alert} from 'react-native';
import {images} from '../utils/images';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = () => {
  const {userDispatch, user} = useContext(UserContext);
  const {spinner} = useContext(ProgressContext);
  const theme = useContext(ThemeContext);

  const currentUser = {...user};

  // const user = getCurrentUser();
  const [photoUrl, setPhotoUrl] = useState(currentUser.photoUrl);

  const _handleLogoutButtonPress = async () => {
    try {
      await logout();
      await signOut();
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    } finally {
      await userDispatch({});
    }
  };

  // const _handlePhotoChange = async url => {
  //   try {
  //     const updatedUser = await UpdateUserPhoto(url);
  //     setPhotoUrl(updatedUser.photoUrl);
  //   } catch (e) {
  //     Alert.alert('Photo Updating Error', e.message);
  //   } finally {
  //   }
  // };

  return (
    <Container>
      <Image
        url={photoUrl}
        // onChangeImage={_handlePhotoChange}
        // showButton
        rounded
      />
      <Button title="logout" onPress={_handleLogoutButtonPress} />
    </Container>
  );
};

export default Profile;
