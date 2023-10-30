/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {useTouchable} from './Touchable';
import Animated from 'react-native-reanimated';
import {GetScaledValue} from '../methods';

const Card = ({index}: {index: string}) => {
  const {hasFocus} = useTouchable();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: hasFocus ? 'blue' : 'red',
        },
      ]}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: GetScaledValue(24),
        }}>
        {index}
      </Text>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: GetScaledValue(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
