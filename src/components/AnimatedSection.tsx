import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useRef} from 'react';
import Series from './Series';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useApp} from '../context';
import {IData} from '../context/App/initialState';

const AnimatedSection = () => {
  const {data, focusKey} = useApp();
  const ref = useRef<FlatList>(null);
  const {height} = useWindowDimensions();
  const contentY = useSharedValue(height / 2);

  const currentSection = data.findIndex((i: IData) =>
    focusKey.startsWith(i.title),
  );

  const animatedContainer = useAnimatedStyle(() => {
    return {
      height: withTiming(contentY.value, {duration: 400}),
    };
  });

  // const renderItem = useCallback(
  //   ({item, index}: {item: IData; index: number}) => {
  //     return (
  //       <Series
  //         item={item}
  //         sectionIndex={index}
  //         sectionRef={ref}
  //         currentSection={currentSection}
  //         contentY={contentY}
  //       />
  //     );
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [ref, currentSection],
  // );

  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      {data.map((item: IData, index: number) => {
        return (
          <Series
            key={index}
            item={item}
            sectionIndex={index}
            sectionRef={ref}
            currentSection={currentSection}
            contentY={contentY}
          />
        );
      })}
      {/* <FlatList
        ref={ref}
        data={data}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      /> */}
    </Animated.View>
  );
};

export default AnimatedSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
