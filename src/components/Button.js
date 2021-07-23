import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const TRANSPARENT = 'transparent';

const Container = styled.Pressable`
  background-color: ${({theme, isFilled}) =>
    isFilled ? theme.buttonBackground : TRANSPARENT};
  align-items: center;
  border-radius: 4px;
  border: ${({isWhite, theme}) =>
    !isWhite ? 'none' : '1px solid ' + theme.buttonBorder};
  width: 98%;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  margin-top: 15px;
`;

const Title = styled.Text`
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme, isFilled}) =>
    isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle};
`;

const Button = ({
  isWhite,
  containerStyle,
  title,
  onPress,
  isFilled,
  disabled,
}) => {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
      isWhite={isWhite}>
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  );
};

Button.defaultProps = {
  isFilled: true,
  isWhite: false,
};

Button.propTypes = {
  isWhite: PropTypes.bool,
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
