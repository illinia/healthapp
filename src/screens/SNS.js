import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {Post} from '../components';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const SNS = ({navigation}) => {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <Post />
    </Container>
  );
};

export default SNS;
