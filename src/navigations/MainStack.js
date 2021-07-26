import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './MainTab';
import {DetailFood, DetailInfo, DetailMeal, MealPlanner} from '../screens';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: {backgroundColor: theme.backgroundColor},
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="MealPlanner" component={MealPlanner} />
      <Stack.Screen name="DetailMeal" component={DetailMeal} />
      <Stack.Screen name="DetailFood" component={DetailFood} />
      <Stack.Screen name="DetailInfo" component={DetailInfo} />
    </Stack.Navigator>
  );
};

export default MainStack;
