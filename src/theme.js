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
  errorText: Colors.red700,
  buttonBackground: Colors.blue400,
  buttonTitle: Colors.white,
  buttonUnfilledTitle: Colors.grey500,
  buttonBorder: Colors.grey400,
  headerTintColor: Colors.black,
  tabActiveColor: Colors.blue500,
  tabInactiveColor: Color(Colors.blue500).alpha(0.5).lighten(0.5).string(),
  spinnerBackground: Colors.black,
  spinnerIndicator: Colors.white,
};
