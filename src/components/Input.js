import React, {useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  padding-horizontal: 10px;
  color: ${({theme, isFocused}) => (isFocused ? theme.text : theme.label)};
`;

const StyledTextInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({theme, editable}) =>
    editable ? theme.background : theme.inputDisabledBackground};
  color: ${({theme}) => theme.text};
  padding: 10px 10px;
  font-size: 16px;
  border-bottom-color: ${({theme, isFocused}) =>
    isFocused ? theme.text : theme.inputBorder};
  border-bottom-width: 1px;
  border-radius: 10px;
`;

const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      isPassword,
      returnKeyType,
      maxLength,
      disabled,
      inputStyle,
      inputContainerStyle,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container style={inputContainerStyle}>
        <Label isFocused={isFocused}>{label}</Label>
        <StyledTextInput
          ref={ref}
          isFocused={isFocused}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          underlineColorAndroid="transparent"
          editable={!disabled}
          style={inputStyle}
        />
      </Container>
    );
  },
);

Input.defaultProps = {
  onBlur: () => {},
  onChangeText: () => {},
  onSubmitEditing: () => {},
  ref: '',
  inputStyle: {},
  label: '',
  inputContainerStyle: {marginVertical: 10},
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(['done', 'next']),
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
};

export default Input;
