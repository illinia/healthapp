import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {images} from '../utils/images';
import {Alert, Text} from 'react-native';
import {Image} from '.';
import {deleteComment} from '../utils/firebase';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({theme}) => theme.background};
  padding-vertical: 10px;
  padding-horizontal: 15px;
`;

const NameAndContentContainer = styled.View`
  width: 80%;
  height: 100%;
`;

const NameContainer = styled.Text`
  font-size: 20;
  font-weight: 600;
  margin-right: 10;
`;

const TimeAndDelete = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6;
`;

const DeleteButton = styled.Text`
  color: grey;
`;

const Comment = ({
  navigation,
  profileURL,
  name,
  content,
  createdAt,
  commentId,
  postId,
  isOwned,
  onRefresh,
}) => {
  const [profileUrl, setProfileUrl] = useState(images.logo);
  useEffect(() => {
    setProfileUrl(profileURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _deleteComment = async () => {
    Alert.alert('Comment is deleted!');
    await deleteComment(postId, commentId);
    onRefresh();
  };
  return (
    <Container>
      <Image
        url={profileUrl}
        rounded
        imageStyle={{width: 54, height: 54, marginRight: 6}}
      />
      <NameAndContentContainer>
        <NameContainer>{name}</NameContainer>
        <Text style={{fontSize: 16}}>{content}</Text>
        <TimeAndDelete>
          <Text style={{color: 'grey'}}>{createdAt}</Text>
          {isOwned && (
            <DeleteButton onPress={() => _deleteComment()}>Delete</DeleteButton>
          )}
        </TimeAndDelete>
      </NameAndContentContainer>
    </Container>
  );
};

export default Comment;
