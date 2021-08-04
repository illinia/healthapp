import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {images} from '../utils/images';
import {Alert, Text} from 'react-native';
import {Image} from '.';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({theme}) => theme.background};
  margin-vertical: 10px;
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

const Comment = ({navigation, profileURL, name, content, createdAt}) => {
  const [profileUrl, setProfileUrl] = useState(images.logo);
  useEffect(() => {
    setProfileUrl(profileURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <DeleteButton onPress={() => Alert.alert('delete')}>
            Delete
          </DeleteButton>
        </TimeAndDelete>
      </NameAndContentContainer>
    </Container>
  );
};

export default Comment;
