import React from 'react';
import {Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.Image`
  background-color: ${({theme}) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({rounded}) => (rounded ? 50 : 0)}px;
`;

const ButtonContainer = styled.Pressable`
  background-color: ${({theme}) => theme.imageButtonBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(Icon).attrs({
  name: 'camera-outline',
  size: 22,
})`
  color: ${({theme}) => theme.imageButtonIcon};
`;

const PhotoButton = ({onPress}) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const Images = ({url, imageStyle, rounded, showButton, onChangeImage}) => {
  const options = {
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
  };

  const _handleEditButton = async () => {
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        console.log(response.assets[0].uri);
        onChangeImage(response.assets[0].uri);
      }
    });
  };

  return (
    <Container>
      <StyledImage source={{uri: url}} style={imageStyle} rounded={rounded} />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  );
};

Images.defaultProps = {
  rounded: false,
  showButton: false,
  onChangeImage: () => {},
};

Images.propTypes = {
  uri: PropTypes.string,
  imageStyle: PropTypes.object,
  rounded: PropTypes.bool,
  showButton: PropTypes.bool,
  onChangeImage: PropTypes.func,
};

export default Images;
