import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${({theme}) => theme.imageBackground};
  margin-vertical: 10px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const PostImage = ({navigation, photoURL}) => {
  return (
    <Container>
      <StyledImage source={{uri: photoURL}} resizeMode="cover" />
    </Container>
  );
};

export default PostImage;
