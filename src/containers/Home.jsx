import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontFamily} from '../../GlobalStyles';

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c0c0c',
      }}>
      <Text
        style={{
          color: 'white',
          fontFamily: FontFamily.poppinsBlack,
        }}>
        Home
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
