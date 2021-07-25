import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './MainTab';
import {DetailMeal, MealPlanner} from '../screens';
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
    </Stack.Navigator>
  );
};

export default MainStack;
