import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import FocusableCard from './FocusableCard';
import {IData} from '../context/App/initialState';
import AnimatedBorder from './AnimatedBorder';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';
import useCustomFocus from '../hooks/useCustomFocus';
import {appActions, useApp} from '../context';

const refs: any[] = [];

const Series = ({
  item,
  sectionIndex,
  currentSection,
  scrollY,
}: {
  item: IData;
  sectionIndex: number;
  currentSection: number;
  contentY: SharedValue<number>;
  scrollY: SharedValue<number>;
}) => {
  const ref = useRef<FlatList>(null);
  const {appDispatch} = useApp();
  const {setFocus} = useCustomFocus();
  const {width} = useWindowDimensions();
  const ITEM_LENGTH = item.items.length;
  const ITEM_WIDTH = item.width + GetScaledValue(20);

  const position = useSharedValue({
    x: GetScaledValue(210),
    width: item.width,
  });

  const sectionWidth = useSharedValue(item.width);

  const animatedItem = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(scrollY.value, {duration: 400})}],
    };
  });

  useEffect(() => {
    // navigation yada aksiyon sonrası next focuslar için refler contexte tutulmalı
    // setDirection geçici isimlerndirme
    appDispatch(appActions.setDirection(refs[1]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 0,
    });

    position.value = {
      ...position.value,
      x: GetScaledValue(210),
    };
    setFocus(refs[currentSection]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  const renderItem = useCallback(
    ({index: idx}: {index: number}) => {
      return (
        <View key={idx} ref={el => idx === 0 && refs.push(el)}>
          <FocusableCard
            index={idx}
            itemWidth={ITEM_WIDTH}
            itemHeight={item.height}
            itemLength={ITEM_LENGTH}
            sectionWidth={sectionWidth}
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sectionIndex],
  );

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
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListFooterComponent={
          <TouchableOpacity
            onFocus={() =>
              (position.value = {
                ...position.value,
                x: width - GetScaledValue(220),
                width: GetScaledValue(200),
              })
            }
            onBlur={() => {
              // up ve down action'da sorun yaratır
              position.value = {
                ...position.value,
                x: position.value.x - ITEM_WIDTH,
                width: item.width,
              };
            }}
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
    paddingLeft: GetScaledValue(200),
  },
  listContainer: {
    zIndex: 98,
    flexDirection: 'row',
  },
  listFooterContainer: {
    width: GetScaledValue(200),
    marginRight: GetScaledValue(220),
    backgroundColor: 'purple',
    marginLeft: GetScaledValue(10),
    borderRadius: GetScaledValue(10),
    marginTop: GetScaledValue(10),
  },
});
