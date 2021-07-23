import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {Button} from '../components';
import {logout} from '../utils/firebase';
import {UserContext, ProgressContext} from '../context';
import {signOut} from '../utils/googleButton';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const Profile = () => {
  const {userDispatch} = useContext(UserContext);
  const {spinner} = useContext(ProgressContext);

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

  return (
    <Container>
      <Button title="logout" onPress={_handleLogoutButtonPress} />
    </Container>
  );
};

export default Profile;
