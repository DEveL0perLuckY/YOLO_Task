import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontFamily} from '../../GlobalStyles';

const Ginie = () => {
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
        Ginie
      </Text>
    </View>
  );
};

export default Ginie;

const styles = StyleSheet.create({});
