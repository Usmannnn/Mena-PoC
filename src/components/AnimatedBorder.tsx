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

const AnimatedBorder = ({
  style,
  position,
}: {
  style: StyleProp<ViewStyle>;
  position: SharedValue<{x: number; y: number}>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withTiming(position.value.x, {duration: 400})},
        {translateY: withTiming(position.value.y, {duration: 400})},
      ],
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
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#ffbc00',
    zIndex: 99,
  },
});
