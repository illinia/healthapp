import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'react-native-paper';
import styled from 'styled-components/native';

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const Images = ({ url, imageStyle, rounded }) => {
  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
    </Container>
  );
};

Images.defaultProps = {
  rounded: false,
};

Images.propTypes = {
  uri: PropTypes.string,
  imageStyle: PropTypes.object,
  rounded: PropTypes.bool,
};

export default Images;
