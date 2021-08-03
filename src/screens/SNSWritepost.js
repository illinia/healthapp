import React, {useContext, useState, useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {Alert, Text} from 'react-native';
import {ProgressContext} from '../context';
import {createPost} from '../utils/firebase';
import {images} from '../utils/images';
import {Input, Button, PostImage} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import {CommonActions} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const SNSWritepost = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({onPress}) => (
        <FontAwesome
          name="angle-left"
          size={35}
          style={{marginLeft: 15}}
          color="black"
          onPress={onPress}
        />
      ),
      headerRight: () => (
        <Text
          style={{marginRight: 15, fontSize: 16}}
          onPress={() => _handleImageLibrary()}>
          Photo
        </Text>
      ),
    });
  });
  const {spinner} = useContext(ProgressContext);
  const [photoUrl, setPhotoUrl] = useState('');
  const [content, setContent] = useState('');

  const _handleImageLibrary = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', maxWidth: 500, maxHeight: 500},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log(response.assets[0].uri);
          setPhotoUrl(response.assets[0].uri);
        }
      },
    );
  };

  const _handelCreateButtonPress = async () => {
    try {
      spinner.start();
      await createPost({content, photoUrl});
      navigation.dispatch(CommonActions.navigate('Main'));
    } catch (e) {
      Alert.alert('Creation Error', e.message);
    } finally {
      spinner.stop();
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Container>
        <Input
          inputStyle={{width: '90%', alignSelf: 'center', borderColor: '#fff'}}
          placeholder="What's going on?"
          value={content}
          onChangeText={text => setContent(text)}
        />
        <PostImage photoURL={photoUrl} />
        <Button
          containerStyle={{
            width: '60%',
            marginTop: 10,
            borderRadius: 10,
            alignSelf: 'center',
          }}
          title="Upload Post!"
          onPress={() => _handelCreateButtonPress()}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default SNSWritepost;
