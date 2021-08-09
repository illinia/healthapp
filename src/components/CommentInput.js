import React, {useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {Image} from '.';
import {removeWhitespace} from '../utils/common';
import {addComment} from '../utils/firebase';

const Container = styled.Pressable`
  width: 100%;
  height: 220px;
  background-color: ${({theme}) => theme.background};
  border-top-width: 1px;
  border-color: ${({theme}) => theme.imageBackground};
  border-style: solid;
  padding-horizontal: 20px;
  padding-top: 20px;
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
  margin-top: 8px;
`;

const CommentInput = ({
  navigation,
  photoURL,
  onFocus,
  onBlur,
  onRefresh,
  postId,
}) => {
  const [commentValue, setCommentValue] = useState('');

  const _addComment = async () => {
    const result = removeWhitespace(commentValue);
    if (!result) {
      Alert.alert('Whitespace is not allowed for comment.');
      setCommentValue('');
    } else {
      Alert.alert('Add successfully!');
      await addComment(commentValue, postId);
      setCommentValue('');
      onRefresh();
    }
  };
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
        value={commentValue}
        onChangeText={text => setCommentValue(text)}
        onSubmitEditing={() => _addComment()}
        returnKeyType="done"
      />
    </Container>
  );
};

export default CommentInput;
