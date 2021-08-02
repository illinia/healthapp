import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image} from '.';
import {images} from '../utils/images';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native';
import PostText from './PostText';
import PostImage from './PostImage';

const Container = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.background};
`;

const TopContainer = styled.View`
  width: 94%;
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
  width: 94%;
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
  width: 94%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6px;
`;
const Post = () => {
  const [photoUrl, setPhotoUrl] = useState(images.logo);
  return (
    <Container>
      <TopContainer>
        <ProfileAndPictureContainer>
          <Image
            url={photoUrl}
            rounded
            imageStyle={{width: 54, height: 54, marginRight: 6}}
          />
          <ProfileTextContainer>
            <Text style={{fontWeight: '600', fontSize: 20}}>Test</Text>
            <Text>test2</Text>
          </ProfileTextContainer>
        </ProfileAndPictureContainer>
        <Entypo name="dots-three-horizontal" size={30} />
      </TopContainer>
      <PostText textContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed ne..." />
      <PostImage />
      <BottomContainer>
        <IconContainer>
          <Ionicons
            name="ios-heart-outline"
            size={30}
            style={{marginRight: 5}}
          />
          <Text style={{fontSize: 18, fontWeight: '500', marginRight: 10}}>
            300
          </Text>
          <MaterialCommunityIcons
            name="comment-text"
            size={30}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '500', fontSize: 18}}>300</Text>
        </IconContainer>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'grey',
          }}>
          4hrs ago
        </Text>
      </BottomContainer>
      <Text
        style={{
          width: '94%',
          marginTop: 6,
          fontSize: 16,
          color: 'grey',
        }}>
        All Comment
      </Text>
      <AddCommentContainer>
        <Image
          url={photoUrl}
          rounded
          imageStyle={{width: 30, height: 30, marginRight: 6}}
        />
        <Text style={{color: 'grey'}}>Add comment...</Text>
      </AddCommentContainer>
    </Container>
  );
};

export default Post;
