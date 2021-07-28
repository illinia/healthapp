import React, {useState, useEffect, useRef, useContext} from 'react';
import {ProgressContext, UserContext} from '../context';
import {Image, Input, Button} from '../components';
import {images} from '../utils/images';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Alert} from 'react-native';
import {login} from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  padding: 0 20px;
  padding-top: ${({insets: {top}}) => top}px;
  padding-bottom: ${({insets: {bottom}}) => bottom}px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({theme}) => theme.errorText};
`;

const Login = ({navigation}) => {
  const {userDispatch} = useContext(UserContext);
  const {spinner} = useContext(ProgressContext);
  const insets = useSafeAreaInsets();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = value => {
    const changedEmail = removeWhitespace(value);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please check ur email.',
    );
  };
  const _handlePasswordChange = value => {
    setPassword(removeWhitespace(value));
  };

  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();
      const user = await login({email, password});
      userDispatch(user);
    } catch (e) {
      Alert.alert('Login Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{flex: 1}}
      extraScrollHeight={80}
      keyboardShouldPersistTaps="always">
      <Container insets={insets}>
        <Image url={images.logo} />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
          isWhite
        />
        {/* <GoogleButton /> */}
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
