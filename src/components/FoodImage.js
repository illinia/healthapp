import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {Alert} from 'react-native';

const Container = styled.View`
  width: 112px;
  height: 150px;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled.Image`
  background-color: ${({theme}) => theme.imageBackground};
  width: 112px;
  height: 112px;
`;

const ButtonContainer = styled.Pressable`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

const StyledText = styled.Text`
  margin-top: 5px;
  font-size: 20px;
`;

const FoodImage = ({source, title}) => {
  return (
    <Container
      style={{
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#000',
        shadowOpacity: 0.2,
      }}>
      <StyledImage source={source} />
      <ButtonContainer onPress={() => Alert.alert('test')} />
      <StyledText>{title}</StyledText>
    </Container>
  );
};

FoodImage.defaultProps = {};

FoodImage.propTypes = {
  uri: PropTypes.string,
  imageStyle: PropTypes.object,
};

export default FoodImage;
