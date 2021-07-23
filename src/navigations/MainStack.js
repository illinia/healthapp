import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Calculater, MealPlanner} from '../screens';
import MainTab from './MainTab';

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
      <Stack.Screen name="Calculater" component={Calculater} />
      <Stack.Screen name="MealPlanner" component={MealPlanner} />
    </Stack.Navigator>
  );
};

export default MainStack;
