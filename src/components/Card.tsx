/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTouchable} from './Touchable';

const Card = ({index}: {index: string}) => {
  const {hasFocus} = useTouchable();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: hasFocus ? 'blue' : 'black',
        },
      ]}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
        {index}
      </Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
