import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Calculator, Profile, SNS, Chat} from '../screens';
import {ThemeContext} from 'styled-components/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainTab = ({navigation, route}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const titles = route.state?.routeNames || ['Calculator'];
    const index = route.state?.index || 0;
    navigation.setOptions({headerTitle: titles[index]});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
  return (
    <Tab.Navigator
      initialRouteName="Calculator"
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
        style: {
          paddingTop: '2%',
        },
      }}>
      <Tab.Screen
        name="SNS"
        component={SNS}
        options={{
          tabBarIcon: ({focused}) => (
            <AntIcon
              name="instagram"
              size={25}
              color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="ios-chatbox-outline"
              size={25}
              color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          tabBarIcon: ({focused}) => (
            <AntIcon
              name="apple-o"
              size={25}
              color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <AntIcon
              name="setting"
              size={25}
              color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
