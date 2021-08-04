import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Image} from '.';
import {images} from '../utils/images';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native';
import {PostText, PostImage} from '.';
import {addComment} from '../utils/firebase';

const Container = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  margin-vertical: 10px;
`;

const TopContainer = styled.View`
  width: 90%;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileAndPictureContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 54px;
`;

const ProfileTextContainer = styled.View`
  justify-content: center;
`;

const BottomContainer = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddCommentContainer = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6px;
`;

const CommentInput = styled.TextInput`
  width: 90%;
  height: 100%;
  padding-horizontal: 10px;
`;
const Post = React.memo(
  ({
    navigation,
    content,
    createdAt,
    name,
    postId,
    updateboolean,
    email,
    photoURL,
    profileURL,
    comment,
    like,
  }) => {
    const [photoUrl, setPhotoUrl] = useState(images.logo);
    const [profileUrl, setProfileUrl] = useState(images.logo);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
      setPhotoUrl(photoURL);
      setProfileUrl(profileURL);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Container>
        <TopContainer>
          <ProfileAndPictureContainer>
            <Image
              url={profileUrl}
              rounded
              imageStyle={{width: 54, height: 54, marginRight: 6}}
            />
            <ProfileTextContainer>
              <Text style={{fontWeight: '600', fontSize: 20}}>{name}</Text>
              <Text>{email}</Text>
            </ProfileTextContainer>
          </ProfileAndPictureContainer>
          {updateboolean && (
            <Entypo
              name="dots-three-horizontal"
              size={20}
              onPress={() => navigation.navigate('Edit')}
            />
          )}
        </TopContainer>
        <PostText textContent={content} />
        <PostImage photoURL={photoUrl} />
        <BottomContainer>
          <IconContainer>
            <Ionicons
              name="ios-heart-outline"
              size={25}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 16, fontWeight: '500', marginRight: 10}}>
              {like}
            </Text>
            <MaterialCommunityIcons
              name="comment-text"
              size={25}
              style={{marginRight: 5}}
            />
            <Text style={{fontWeight: '500', fontSize: 16}}>{comment}</Text>
          </IconContainer>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: 'grey',
            }}>
            {createdAt}
          </Text>
        </BottomContainer>
        <Text
          style={{
            width: '90%',
            marginVertical: 6,
            fontSize: 16,
            color: 'grey',
          }}
          onPress={() => navigation.navigate('Comment', {postId: postId})}>
          All Comment
        </Text>
        <AddCommentContainer>
          <Image
            url={profileUrl}
            rounded
            imageStyle={{width: 30, height: 30, marginRight: 6}}
          />
          <CommentInput
            placeholder="Add comment..."
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="none"
            value={inputValue}
            onChangeText={text => setInputValue(text)}
            onSubmitEditing={() => {
              addComment(inputValue, postId);
              setInputValue('');
              navigation.navigate('Comment', {postId: postId});
            }}
          />
        </AddCommentContainer>
      </Container>
    );
  },
);

export default Post;
