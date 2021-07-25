import {Colors} from 'react-native-paper';
import Color from 'color';

export const theme = {
  background: Colors.white,
  text: Colors.black,
  imageBackground: Colors.grey300,
  imageButtonBackground: Colors.grey500,
  imageButtonIcon: Colors.white,
  label: Colors.grey500,
  inputPlaceholder: Colors.grey500,
  inputBorder: Colors.grey500,
  inputDisabledBackground: Colors.grey300,
  errorText: Colors.red700,
  buttonBackground: Colors.blue400,
  buttonTitle: Colors.white,
  buttonUnfilledTitle: Colors.grey500,
  buttonBorder: Colors.grey400,
  buttonLogout: Colors.red400,
  headerTintColor: Colors.black,
  tabActiveColor: Colors.grey700,
  tabInactiveColor: Color(Colors.grey700).alpha(0.6).lighten(0.4).string(),
  spinnerBackground: Colors.black,
  spinnerIndicator: Colors.white,
};
