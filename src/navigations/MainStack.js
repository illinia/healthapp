import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './MainTab';
import {
  ChatMaking,
  ChatRoom,
  DetailFood,
  DetailInfo,
  DetailMeal,
  MealPlanner,
  SNSComment,
  SNSWritepost,
} from '../screens';

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
      <Stack.Screen name="Comment" component={SNSComment} />
      <Stack.Screen name="New Post" component={SNSWritepost} />
      <Stack.Screen name="New Chat" component={ChatMaking} />
      <Stack.Screen name="Chat Room" component={ChatRoom} />
    </Stack.Navigator>
  );
};

export default MainStack;
