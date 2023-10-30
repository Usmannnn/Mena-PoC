import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';

const AnimatedBorder = ({
  style,
  position,
}: {
  style: StyleProp<ViewStyle>;
  position: SharedValue<{x: number; width: number; height: number}>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(position.value.x, {duration: 400})}],
      width: withTiming(position.value.width, {duration: 400}),
      height: withTiming(position.value.height, {duration: 400}),
    };
  });

  return (
    <Animated.View
      layout={Layout}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(400)}
      style={[styles.container, animatedStyle, style]}
    />
  );
};

export default AnimatedBorder;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: GetScaledValue(10),
    borderRadius: GetScaledValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: GetScaledValue(5),
    borderColor: '#ffbc00',
  },
});
