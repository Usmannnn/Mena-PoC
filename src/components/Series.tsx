import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import FocusableCard from './FocusableCard';
import {IData} from '../context/App/initialState';
import AnimatedBorder from './AnimatedBorder';
import {SharedValue} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';
import useCustomFocus from '../hooks/useCustomFocus';

const refs: any[] = [];

const Series = ({
  item,
  sectionIndex,
  currentSection,
  position,
}: {
  item: IData;
  sectionIndex: number;
  currentSection: number;
  contentY: SharedValue<number>;
  position: SharedValue<{x: number; y: number}>;
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
          animated={position}
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

  // refs.current.map(i => console.log(i?._children[0]?._nativeTag));

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
  listFooterContainer: {
    width: GetScaledValue(200),
    marginRight: GetScaledValue(220),
    backgroundColor: 'purple',
    marginLeft: GetScaledValue(10),
    borderRadius: GetScaledValue(10),
    marginTop: GetScaledValue(10),
  },
});
