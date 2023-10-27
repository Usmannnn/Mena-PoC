import {ScrollView, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import Series from './Series';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useApp} from '../context';
import {IData} from '../context/App/initialState';
import {GetScaledValue} from '../methods';
import useScrollHandler from '../hooks/useScrollHandler';

const AnimatedSection = () => {
  const {data, focusKey} = useApp();
  const {height} = useWindowDimensions();
  const contentY = useSharedValue(height / 2);

  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const position = useSharedValue({
    x: GetScaledValue(210),
    y: GetScaledValue(10),
  });

  const currentSection = data.findIndex((i: IData) =>
    focusKey.startsWith(i.title),
  );

  const animatedContainer = useAnimatedStyle(() => {
    return {
      height: withTiming(contentY.value, {duration: 400}),
    };
  });
  const {scrollToVertical} = useScrollHandler();

  const animatedItem = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(scrollY.value, {duration: 400})}],
      opacity: interpolate(scrollY.value, [0, 200], [1, 0]),
    };
  });

  useEffect(() => {
    scrollToVertical(currentSection, contentY, position, scrollX, scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      <ScrollView scrollEnabled={false}>
        {data.map((item: IData, index: number) => {
          return (
            <Animated.View style={animatedItem} key={index}>
              <Series
                item={item}
                sectionIndex={index}
                currentSection={currentSection}
                contentY={contentY}
                position={position}
              />
            </Animated.View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default AnimatedSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
