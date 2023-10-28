import {ScrollView, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import Series from './Series';
import Animated, {
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
  const {scrollToVertical} = useScrollHandler();

  const scrollY = useSharedValue(0);
  const contentY = useSharedValue(height / 2);
  // const position = useSharedValue(GetScaledValue(210));
  const position = useSharedValue(GetScaledValue(10));

  const currentSection = data.findIndex((i: IData) =>
    focusKey.startsWith(i.title),
  );

  const animatedContainer = useAnimatedStyle(() => {
    return {
      height: withTiming(contentY.value, {duration: 400}),
    };
  });

  useEffect(() => {
    console.log({currentSection});

    if (currentSection !== -1) {
      scrollToVertical(currentSection, contentY, scrollY);
    } else {
      position.value = GetScaledValue(10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      <ScrollView scrollEnabled={false}>
        {data.map((item: IData, index: number) => {
          return (
            <Series
              key={index}
              item={item}
              contentY={contentY}
              position={position}
              sectionIndex={index}
              currentSection={currentSection}
              scrollY={scrollY}
            />
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
