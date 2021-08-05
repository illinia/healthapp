import React from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {Image} from '.';

const Container = styled.Pressable`
  width: 100%;
  height: 220px;
  background-color: ${({theme}) => theme.background};
  border-top-width: 2px;
  border-color: ${({theme}) => theme.imageBackground};
  border-style: solid;
  padding-horizontal: 10px;
  padding-top: 24px;
  /* padding-bottom: 30px; */
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const InsideInput = styled.TextInput`
  width: 80%;
  height: 40px;
  border: 1px solid ${({theme}) => theme.inputBorder};
  border-radius: 50px;
  padding-horizontal: 20px;
  font-size: 18px;
`;

const CommentInput = ({navigation, photoURL, onFocus, onBlur}) => {
  return (
    <Container>
      <Image url={photoURL} rounded imageStyle={{width: 54, height: 54}} />
      <InsideInput
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        placeholder="Add comment..."
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none"
        underlineColorAndroid="transparent"
      />
    </Container>
  );
};

export default CommentInput;
