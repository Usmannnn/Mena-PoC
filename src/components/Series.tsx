import {ScrollView, StyleSheet, TVFocusGuideView, View} from 'react-native';
import React, {useCallback} from 'react';
import FocusableCard from './FocusableCard';
import {IData} from '../context/App/initialState';
import AnimatedBorder from './AnimatedBorder';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';

const Series = ({
  item,
  sectionIndex,
  currentSection,
  position,
  scrollX,
}: {
  item: IData;
  sectionIndex: number;
  currentSection: number;
  contentY: SharedValue<number>;
  position: SharedValue<{x: number; y: number}>;
  scrollX: SharedValue<number>;
}) => {
  const ITEM_LENGTH = item.items.length;
  const ITEM_WIDTH = item.width + GetScaledValue(20);

  const renderItem = useCallback((idx: number) => {
    return (
      <TVFocusGuideView trapFocusRight={idx === ITEM_LENGTH - 1} key={idx}>
        <FocusableCard
          index={idx}
          itemWidth={ITEM_WIDTH}
          itemLength={ITEM_LENGTH}
          animated={position}
          focusKey={`section${sectionIndex}_item${idx}`}
          scrollX={scrollX}
          style={{
            width: item.width,
            height: item.height,
            margin: GetScaledValue(10),
          }}
        />
      </TVFocusGuideView>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(scrollX.value, {duration: 400})}],
    };
  });

  return (
    <>
      <View style={{zIndex: 99}}>
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

      <ScrollView scrollEnabled={false} horizontal>
        <Animated.View
          style={[
            currentSection === sectionIndex && animatedStyle,
            styles.container,
          ]}>
          {item.items.map((_, index) => renderItem(index))}
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default Series;

const styles = StyleSheet.create({
  container: {
    zIndex: 98,
    paddingLeft: GetScaledValue(200),

    flexDirection: 'row',
  },
  contentContainerStyle: {
    paddingRight: GetScaledValue(200),
  },
});
