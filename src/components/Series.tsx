import {FlatList, StyleSheet, TVFocusGuideView, View} from 'react-native';
import React, {RefObject, useCallback, useEffect, useRef} from 'react';
import FocusableCard from './FocusableCard';
import {IData} from '../context/App/initialState';
import AnimatedBorder from './AnimatedBorder';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';
import useScrollHandler from '../hooks/useScrollHandler';

const Series = ({
  item,
  sectionIndex,
  sectionRef,
  currentSection,
  contentY,
}: {
  item: IData;
  sectionIndex: number;
  sectionRef: RefObject<FlatList>;
  currentSection: number;
  contentY: SharedValue<number>;
}) => {
  const ref = useRef<FlatList>(null);
  const {scrollToVertical} = useScrollHandler();

  const position = useSharedValue({
    x: GetScaledValue(210),
    y: GetScaledValue(10),
  });

  const ITEM_LENGTH = item.items.length;
  const ITEM_WIDTH = item.width + GetScaledValue(20);

  useEffect(() => {
    scrollToVertical(sectionRef, currentSection, contentY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef, currentSection]);

  const renderItem = useCallback(({index: idx}: {index: number}) => {
    return (
      <TVFocusGuideView trapFocusRight={idx === ITEM_LENGTH - 1}>
        <FocusableCard
          index={idx}
          itemWidth={ITEM_WIDTH}
          itemLength={ITEM_LENGTH}
          animated={position}
          listRef={ref}
          focusKey={`section${sectionIndex}_item${idx}`}
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

      <FlatList
        ref={ref}
        horizontal={true}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={item.items}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
    </>
  );
};

export default Series;

const styles = StyleSheet.create({
  container: {
    zIndex: 98,
    paddingLeft: GetScaledValue(200),
  },
  contentContainerStyle: {
    paddingRight: GetScaledValue(200),
  },
});
