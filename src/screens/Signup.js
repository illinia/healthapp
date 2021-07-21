import React from 'react';
import styled from 'styled-components/native';
import { Text, SafeAreaView } from 'react-native';
import { Colors } from 'react-native-paper';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Signup = () => {
  return (
    <Container>
      <Text style={{ fontSize: 30 }}>Signup Screen</Text>
    </Container>
  );
};

export default Signup;
