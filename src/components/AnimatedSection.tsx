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
import useScrollHandler from '../hooks/useScrollHandler';

const AnimatedSection = () => {
  const {data, focusKey} = useApp();

  const {height} = useWindowDimensions();
  const {scrollToVertical} = useScrollHandler();

  const scrollY = useSharedValue(0);
  const contentY = useSharedValue(height / 2);

  const currentSection = data.findIndex((i: IData) =>
    focusKey.startsWith(i.title),
  );

  const animatedContainer = useAnimatedStyle(() => {
    return {
      height: withTiming(contentY.value, {duration: 400}),
    };
  });

  useEffect(() => {
    if (currentSection !== -1) {
      scrollToVertical(currentSection, contentY, scrollY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
        {data.map((item: IData, index: number) => {
          return (
            <Series
              key={index}
              item={item}
              contentY={contentY}
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
    backgroundColor: 'black',
  },
});
