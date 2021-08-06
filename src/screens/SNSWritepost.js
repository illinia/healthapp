import React, {useContext, useState, useLayoutEffect, useEffect} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {Alert, Text} from 'react-native';
import {ProgressContext} from '../context';
import {createPost, deletePost, updatePost} from '../utils/firebase';
import {Input, Button, PostImage} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import {CommonActions} from '@react-navigation/native';
import {images} from '../utils/images';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const SNSWritepost = ({navigation, route}) => {
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
  const [photoUrl, setPhotoUrl] = useState(images.logo);
  const [content, setContent] = useState('');

  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (route.params) {
      setContent(route.params.content);
      setPhotoUrl(route.params.photoURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    } catch (e) {
      Alert.alert('Creation error', e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleUpdateButtonPress = async () => {
    try {
      spinner.start();
      await updatePost(content, photoUrl, route.params.postId);
      Alert.alert('Post is updated!');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    } catch (e) {
      Alert.alert('Update error', e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleDeleteButtonPress = async () => {
    try {
      spinner.start();
      await deletePost(route.params.postId);
      Alert.alert('Post is deleted!');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    } catch (e) {
      Alert.alert('Delete error', e.message);
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
      }}
      keyboardShouldPersistTaps="always">
      <Container>
        <Input
          inputStyle={{width: '90%', alignSelf: 'center', borderColor: '#fff'}}
          placeholder="What's going on?"
          value={content}
          onChangeText={text => setContent(text)}
          onSubmitEditing={() => {
            route.params
              ? _handleUpdateButtonPress()
              : _handelCreateButtonPress();
          }}
          returnKeyType="done"
        />
        <PostImage photoURL={photoUrl} />
        {route.params ? (
          <>
            <Button
              containerStyle={{
                width: '90%',
                marginTop: 10,
                borderRadius: 10,
                alignSelf: 'center',
              }}
              title="Update Post!"
              onPress={() => _handleUpdateButtonPress()}
            />
            <Button
              containerStyle={{
                width: '90%',
                backgroundColor: theme.buttonLogout,
                borderRadius: 10,
                alignSelf: 'center',
              }}
              title="Delete Post!"
              onPress={() => _handleDeleteButtonPress()}
            />
          </>
        ) : (
          <Button
            containerStyle={{
              width: '90%',
              marginTop: 10,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            title="Upload Post!"
            onPress={() => _handelCreateButtonPress()}
          />
        )}
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default SNSWritepost;
