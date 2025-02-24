// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../containers/Home';
import Ginie from '../containers/Ginie';
import Yolo from '../containers/Yolo';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const isMiddle = route.name === 'yolo';

        let iconName;
        switch(route.name) {
          case 'Home': iconName = isFocused ? 'home' : 'home-outline'; break;
          case 'yolo': iconName = isFocused ? 'qr-code' : 'qr-code-outline'; break;
          case 'ginie': iconName = isFocused ? 'settings' : 'settings-outline'; break;
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={[
              styles.tabButton,
              isMiddle && styles.middleTab,
              isFocused && styles.activeTab
            ]}
            onPress={() => navigation.navigate(route.name)}
          >
            <Ionicons 
              name={iconName} 
              size={isMiddle ? 28 : 24}
              color={isMiddle ? '#000' : isFocused ? '#fff' : '#888'}
            />
            <Text style={[
              styles.tabText,
              { color: isMiddle ? '#000' : isFocused ? '#fff' : '#888' }
            ]}>
              {route.name === 'yolo' ? 'Yolo Pay' : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    initialRouteName="Home"
  >
    <Tab.Screen
      name="Home"
      options={{ headerShown: false }}
      component={Home}
    />
    <Tab.Screen
      name="yolo"
      options={{ headerShown: false }}
      component={Yolo}
    />
    <Tab.Screen
      name="ginie"
      options={{ headerShown: false }}
      component={Ginie}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#333',
  },
  tabButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 25,
  },
  middleTab: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    transform: [{ translateY: -25 }],
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  activeTab: {
    backgroundColor: '#1a1a1a',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default TabNavigator;