import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

const Container = styled.View`
  width: 90%;
  background-color: ${({theme}) => theme.background};
`;

const PostText = ({textContent}) => {
  return (
    <Container>
      <Text style={{fontSize: 18, fontWeight: '400'}}>{textContent}</Text>
    </Container>
  );
};

export default PostText;
