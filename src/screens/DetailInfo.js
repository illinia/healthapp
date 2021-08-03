import React, {
  useState,
  useRef,
  useContext,
  useLayoutEffect,
  useEffect,
} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import FoodImage from '../components/FoodImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Input} from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {checkNumber, checkTrim, removeWhitespace} from '../utils/common';
import * as icons from '../assets';

const Container = styled.View`
  align-self: center;
  align-items: center;
  padding-top: 30px;
  width: 60%;
  background-color: ${({theme}) => theme.background};
`;

const ErrorText = styled.Text`
  width: 100%;
  color: ${({theme}) => theme.errorText};
`;

const DetailInfo = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({onPress}) => (
        <FontAwesome
          name="angle-left"
          size={35}
          style={{marginLeft: 15}}
          color="black"
          onPress={onPress}
        />
      ),
    });
  });

  const theme = useContext(ThemeContext);
  const [disabled, setDisabled] = useState(true);
  const [mealName, setMealName] = useState(route.params?.mealName);
  const [mealError, setMealError] = useState('');
  const [foodName, setFoodName] = useState(route.params?.foodName);
  const [foodError, setFoodError] = useState('');
  const [calories, setCalories] = useState('');
  const [error, setError] = useState('');
  const foodRef = useRef();
  const caloriesRef = useRef();

  useEffect(() => {
    setDisabled(
      !(mealName && foodName && calories && !mealError && !foodError && !error),
    );
  }, [mealName, foodName, calories, mealError, foodError, error]);

  const _buttonPressed = () => {
    if (!disabled) {
      navigation.navigate('Calculator', {
        mealName: mealName,
        foodName: foodName,
        calories: calories,
      });
    }
  };

  const _handleMealName = name => {
    setMealName(name);
    setMealError(
      checkTrim(name)
        ? ''
        : 'Please remove whitespace both sides of the name.\nand check is correct name.',
    );
  };

  const _handleFoodName = name => {
    setFoodName(name);
    setFoodError(
      checkTrim(name)
        ? ''
        : 'Please remove whitespace both sides of the name.\nand check is correct name.',
    );
  };

  const _handleCalories = cal => {
    const result = removeWhitespace(cal);
    setCalories(result);
    setError(checkNumber(result) ? '' : 'Please put only number in calories.');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="always">
      <Container>
        <FoodImage
          source={icons[route.params.foodName]}
          title={route.params.foodName}
        />
        <Input
          label="Meal Name"
          value={mealName}
          onSubmitEditing={() => foodRef.current.focus()}
          onChangeText={_handleMealName}
          placeholder="Special Dinner!"
          returnKeyType="next"
        />
        {!!mealError && <ErrorText>{mealError}</ErrorText>}
        <Input
          ref={foodRef}
          label="Food Name"
          value={foodName}
          onSubmitEditing={() => caloriesRef.current.focus()}
          onChangeText={_handleFoodName}
          placeholder="Yummy Food!"
          returnKeyType="next"
        />
        {!!foodError && <ErrorText>{foodError}</ErrorText>}
        <Input
          ref={caloriesRef}
          label="Calories"
          value={calories}
          onSubmitEditing={_buttonPressed}
          onChangeText={_handleCalories}
          placeholder="100"
          returnKeyType="done"
        />
        <ErrorText>{error}</ErrorText>
        <Button
          containerStyle={{
            width: '100%',
            borderRadius: 10,
            backgroundColor: theme.buttonLogout,
            marginTop: 10,
          }}
          title="Add Food"
          onPress={_buttonPressed}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default DetailInfo;
