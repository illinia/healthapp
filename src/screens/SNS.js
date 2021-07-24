import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const SNS = ({navigation}) => {
  return (
    <Container>
      <Text style={{fontSize: 24}}>SNS</Text>
    </Container>
  );
};

export default SNS;
