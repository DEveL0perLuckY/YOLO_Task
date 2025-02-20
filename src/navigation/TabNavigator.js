import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../containers/Home';
import Ginie from '../containers/Ginie';
import Yolo from '../containers/Yolo';
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'ginie') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (route.name === 'yolo') {
          iconName = focused ? 'qr-code' : 'qr-code-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#0D0D0D',
      },
    })}
    initialRouteName="Home">
    <Tab.Screen
      name="Home"
      options={{
        headerShown: false,
      }}
      component={Home}
    />
    <Tab.Screen
      name="yolo"
      options={{
        headerShown: false,
        tabBarLabel: 'Yolo Pay',
      }}
      component={Yolo}
    />
    <Tab.Screen
      name="ginie"
      options={{
        headerShown: false,
      }}
      component={Ginie}
    />
  </Tab.Navigator>
);

export default TabNavigator;
