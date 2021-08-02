import React from 'react';
import styled from 'styled-components/native';
import testimage from '../assets/testimage.png';

const Container = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${({theme}) => theme.background};
  margin-vertical: 10px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const PostImage = ({navigation}) => {
  return (
    <Container>
      <StyledImage source={testimage} resizeMode="cover" />
    </Container>
  );
};

export default PostImage;
