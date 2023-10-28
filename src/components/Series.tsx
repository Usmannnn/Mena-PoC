import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import FocusableCard from './FocusableCard';
import {IData} from '../context/App/initialState';
import AnimatedBorder from './AnimatedBorder';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';
import useCustomFocus from '../hooks/useCustomFocus';

const refs: any[] = [];

const Series = ({
  item,
  sectionIndex,
  currentSection,
  position,
  scrollY,
}: {
  item: IData;
  sectionIndex: number;
  currentSection: number;
  contentY: SharedValue<number>;
  position: SharedValue<number>;
  scrollY: SharedValue<number>;
}) => {
  const ref = useRef<FlatList>(null);
  const {setFocus} = useCustomFocus();
  const ITEM_LENGTH = item.items.length;
  const ITEM_WIDTH = item.width + GetScaledValue(20);

  const renderItem = useCallback(({index: idx}: {index: number}) => {
    return (
      <View key={idx} ref={el => idx === 0 && refs.push(el)}>
        <FocusableCard
          index={idx}
          itemWidth={ITEM_WIDTH}
          itemLength={ITEM_LENGTH}
          horizontalRef={ref}
          position={position}
          focusKey={`section${sectionIndex}_item${idx}`}
          style={{
            width: item.width,
            height: item.height,
            margin: GetScaledValue(10),
          }}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 0,
    });

    setFocus(refs[currentSection]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  const animatedItem = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(scrollY.value, {duration: 400})}],
    };
  });

  // const animatedOpacity = useAnimatedStyle(() => {
  //   return {
  //     opacity: withTiming(
  //       interpolate(scrollY.value, [0, -item.width], [1, 0]),
  //       {duration: 400},
  //     ),
  //   };
  // }, [ITEM_WIDTH]);

  return (
    <Animated.View style={[animatedItem]}>
      <View style={styles.container}>
        {currentSection === sectionIndex && (
          <AnimatedBorder
            position={position}
            style={{
              width: item.width,
              height: item.height,
            }}
          />
        )}
      </View>

      <FlatList
        ref={ref}
        horizontal
        data={item.items}
        scrollEnabled={false}
        style={styles.container}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.listFooterContainer, {height: item.height}]}
          />
        }
      />
    </Animated.View>
  );
};

export default Series;

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    // paddingLeft: GetScaledValue(200),
  },
  listContainer: {
    zIndex: 98,
    flexDirection: 'row',
  },
  listFooterContainer: {
    width: GetScaledValue(200),
    marginRight: GetScaledValue(220),
    // marginRight: GetScaledValue(20),
    backgroundColor: 'purple',
    marginLeft: GetScaledValue(10),
    borderRadius: GetScaledValue(10),
    marginTop: GetScaledValue(10),
  },
});
