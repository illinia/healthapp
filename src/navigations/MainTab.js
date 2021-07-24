import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Calculater, Profile} from '../screens';
import {ThemeContext} from 'styled-components/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SNS from '../screens/SNS';
import Chat from '../screens/Chat';

const Tab = createBottomTabNavigator();

// const TabBarIcon = ({focused, name}) => {
//   const theme = useContext(ThemeContext);
//   return (
//     <Icon
//       name={name}
//       size={26}
//       color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
//     />
//   );
// };

const MainTab = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
        style: {
          // height: '12%',
          paddingTop: '2%',
        },
        // showLabel: false,
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
        name="Calculater"
        component={Calculater}
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
