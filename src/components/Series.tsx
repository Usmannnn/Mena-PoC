import {
  FlatList,
  Platform,
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
import {Touchable} from './Touchable';

const refs: any[] = [];
const isAndroid = Platform.OS === 'android';

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
  const {width} = useWindowDimensions();
  const ITEM_LENGTH = item.items.length;
  const ITEM_WIDTH = item.width + GetScaledValue(20);

  const position = useSharedValue({
    x: isAndroid ? GetScaledValue(210) : GetScaledValue(10),
    width: item.width,
  });

  const sectionWidth = useSharedValue(item.width);

  const animatedItem = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(scrollY.value, {duration: 400})}],
    };
  });

  useEffect(() => {
    ref.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 0,
    });

    position.value = {
      ...position.value,
      x: isAndroid ? GetScaledValue(210) : GetScaledValue(10),
    };
    // setFocus(refs[currentSection]); ????
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
          <Touchable
            onPress={() => alert('Load More')}
            onFocus={() =>
              (position.value = {
                ...position.value,
                x: isAndroid
                  ? width - GetScaledValue(220)
                  : width - GetScaledValue(410),
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
    paddingLeft: isAndroid ? GetScaledValue(200) : 0,
  },
  listContainer: {
    zIndex: 98,
    flexDirection: 'row',
  },
  listFooterContainer: {
    width: GetScaledValue(200),
    marginRight: isAndroid ? GetScaledValue(220) : GetScaledValue(10),
    backgroundColor: 'purple',
    marginLeft: GetScaledValue(10),
    borderRadius: GetScaledValue(10),
    marginTop: GetScaledValue(10),
  },
});
