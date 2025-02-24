import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, StyleSheet, Text, Dimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../containers/Home';
import Ginie from '../containers/Ginie';
import Yolo from '../containers/Yolo';
import {FontFamily} from '../../GlobalStyles';
const {height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, navigation}) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.curvecolor}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isMiddle = route.name === 'yolo';

          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = isFocused ? 'home' : 'home-outline';
              break;
            case 'yolo':
              iconName = isFocused ? 'qr-code' : 'qr-code-outline';
              break;
            case 'ginie':
              iconName = isFocused ? 'settings' : 'settings-outline';
              break;
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={[
                styles.tabButton,
                isMiddle && styles.middleTab,
                isFocused && styles.activeTab,
              ]}
              onPress={() => navigation.navigate(route.name)}>
              <View
                style={{
                  borderRadius: 300,
                  borderWidth: 1,
                  borderColor: isFocused ? '#fff' : '#484848', 
                  padding: 10,
                }}>
                <Ionicons
                  name={iconName}
                  size={isMiddle ? 28 : 24}
                  color={isFocused ? '#fff' : '#484848'} 
                />
              </View>
              <Text
                style={[styles.tabText, {color: isFocused ? 'white' : '#484848'}]}>

                {route.name === 'yolo' ? 'Yolo Pay' : route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const TabNavigator = () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    initialRouteName="Home">
    <Tab.Screen name="Home" options={{headerShown: false}} component={Home} />
    <Tab.Screen name="yolo" options={{headerShown: false}} component={Yolo} />
    <Tab.Screen name="ginie" options={{headerShown: false}} component={Ginie} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.161,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopLeftRadius: 80,
    paddingTop: 20,
    borderTopRightRadius: 80,
    
  },
  curvecolor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height * 0.16,
    
  },
  tabButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 25,
  },
  middleTab: {
    // paddingVertical: 15,
    // paddingHorizontal: 25,
    // borderRadius: 30,
    // transform: [{translateY: -25}],
    // shadowColor: '#fff',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },
  // activeTab: {
  //   backgroundColor: '#1a1a1a',
  // },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: FontFamily.poppinsMedium,
  },
});

export default TabNavigator;
