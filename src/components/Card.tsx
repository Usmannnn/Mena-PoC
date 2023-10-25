/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {useTouchable} from './Touchable';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';

const Card = ({index}: {index: string}) => {
  const {hasFocus} = useTouchable();

  const animatedScale = useAnimatedStyle(() => {
    return {
      transform: [{scale: withTiming(hasFocus ? 1.065 : 1, {duration: 300})}],
    };
  }, [hasFocus]);

  return (
    <Animated.View
      style={[
        styles.container,
        // animatedScale,
        {
          backgroundColor: hasFocus ? 'blue' : 'black',
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
