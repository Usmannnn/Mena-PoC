import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useCallback, useRef} from 'react';
import Series from './Series';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useApp} from '../context';
import {IData} from '../context/App/initialState';

const AnimatedSection = () => {
  const {data} = useApp();
  const ref = useRef<FlatList>(null);
  const {height} = useWindowDimensions();
  const contentY = useSharedValue(height / 2);

  const animatedContainer = useAnimatedStyle(() => {
    return {
      height: withTiming(contentY.value, {duration: 400}),
    };
  });

  const renderItem = useCallback(
    ({item, index}: {item: IData; index: number}) => {
      return <Series item={item} sectionIndex={index} />;
    },
    [],
  );

  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      <FlatList
        ref={ref}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Animated.View>
  );
};

export default AnimatedSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
