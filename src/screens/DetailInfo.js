import React, {useState, useRef, useContext, useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import FoodImage from '../components/FoodImage';
import Apple from '../assets/Apple.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Input} from '../components';
import {ThemeContext} from 'styled-components/native';
import {Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  align-self: center;
  align-items: center;
  padding-top: 30px;
  width: 60%;
  background-color: ${({theme}) => theme.background};
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
  const [mealName, setMealName] = useState(route.params?.mealName);
  const [foodName, setFoodName] = useState(route.params?.foodName);
  const [calories, setCalories] = useState('');
  const foodRef = useRef();
  const caloriesRef = useRef();

  const _buttonPressed = () => {
    navigation.navigate('Calculator', {
      mealName: mealName,
      foodName: foodName,
      calories: calories,
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: ({theme}) => theme.background,
      }}>
      <Container>
        <FoodImage source={Apple} title="Fruit" />
        <Input
          label="Meal Name"
          value={mealName}
          onSubmitEditing={() => foodRef.current.focus()}
          onChangeText={value => setMealName(value)}
          placeholder="Enter Meal Name!"
          returnKeyType="next"
        />
        <Input
          ref={foodRef}
          label="Food Name"
          value={foodName}
          onSubmitEditing={() => caloriesRef.current.focus()}
          onChangeText={value => setFoodName(value)}
          placeholder="Enter Food Name!"
          returnKeyType="next"
        />
        <Input
          ref={caloriesRef}
          label="Calories"
          value={calories}
          onSubmitEditing={_buttonPressed}
          onChangeText={value => setCalories(value)}
          placeholder="Enter Calories!"
          returnKeyType="done"
        />
        <Button
          containerStyle={{
            backgroundColor: theme.buttonLogout,
            marginTop: 10,
          }}
          title="Add Food"
          onPress={_buttonPressed}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default DetailInfo;
