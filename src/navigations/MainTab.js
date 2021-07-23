import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Calculater, Profile} from '../screens';
import {ThemeContext} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({focused, name}) => {
  const theme = useContext(ThemeContext);
  return (
    <Icon
      name={name}
      size={26}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const MainTab = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
      }}>
      <Tab.Screen name="Calculater" component={Calculater} options={{tabBarIcon: ({
        TabBarIcon({
          focused,
          name: focused ? '' : '',
        })
      })}}/>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTab;
