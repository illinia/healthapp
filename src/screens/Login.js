import React, { useState, useEffect } from 'react';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoogleButton from '../utils/googleButton';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const _handleLoginButtonPress = () => { };

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && !errorMessage));
  }, [email, errorMessage]);

  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please check ur email.'
    );
  };

  return (
    <KeyboardAwareScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={160}
    >
      <Container insets={insets}>
        <Image url={images.logo} />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Email"
          returnKeyType="next"
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
        />
        <GoogleButton />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
