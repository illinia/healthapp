import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.Pressable`
  width: 90%;
  height: 50px;
  margin-vertical: 5px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.buttonBorder};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MealText = styled.Text`
  font-size: 18px;
`;

const MealBox = ({name, cal, keyId, onPress, style}) => {
  return (
    <Container style={style} key={keyId} onPress={onPress}>
      <MealText>{name}</MealText>
      <MealText>{cal}</MealText>
    </Container>
  );
};

MealBox.defaultProps = {
  onPress: () => {},
  style: {},
};

MealBox.propTypes = {
  name: PropTypes.string.isRequired,
  cal: PropTypes.string.isRequired,
  keyId: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

export default MealBox;
