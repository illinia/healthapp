import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from 'react';
import styled from 'styled-components/native';
import {Input, Button} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Alert} from 'react-native';
import {ProgressContext} from '../context';
import {makeChat} from '../utils/firebase';

const Container = styled.View`
  width: 90%;
  background-color: ${({theme}) => theme.background};
  justify-content: flex-start;
  align-self: center;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({theme}) => theme.errorText};
`;

const ChatMaking = ({navigation}) => {
  const {spinner} = useContext(ProgressContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({onPress}) => (
        <AntDesign
          name="close"
          size={22}
          style={{marginLeft: 15}}
          color="black"
          onPress={onPress}
        />
      ),
    });
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const descriptionRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(title && !errorMessage));
  }, [title, description, errorMessage]);

  const _handleTitleChange = title => {
    setTitle(title);
    setErrorMessage(title.trim() ? '' : 'Please enter the title.');
  };

  const _handleMakeButtonPress = async () => {
    try {
      spinner.start();
      const id = await makeChat({title, description});
      navigation.replace('Chat Room', {id, title});
    } catch (e) {
      Alert.alert('Making chatroom error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex: 1}}
      extraScrollHeight={20}>
      <Container>
        <Input
          inputContainerStyle={{}}
          value={title}
          onChangeText={_handleTitleChange}
          onSubmitEditing={() => {
            setTitle(title.trim());
            descriptionRef.current.focus();
          }}
          onBlur={() => setTitle(title.trim())}
          placeholder="Title"
          returnKeyType="next"
          maxLength={20}
        />
        <Input
          inputContainerStyle={{}}
          ref={descriptionRef}
          value={description}
          onChangeText={text => setDescription(text)}
          onSubmitEditing={() => {
            setDescription(description.trim());
            _handleMakeButtonPress();
          }}
          onBlur={() => setDescription(description.trim())}
          placeholder="Description"
          returnKeyType="done"
          maxLength={40}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Make new chat"
          onPress={_handleMakeButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default ChatMaking;
