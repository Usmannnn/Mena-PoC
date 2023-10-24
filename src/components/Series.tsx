import {FlatList, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import FocusableCard from './FocusableCard';
import {IData} from '../context/App/initialState';
import AnimatedBorder from './AnimatedBorder';
import {useSharedValue} from 'react-native-reanimated';

const Series = ({item, sectionIndex}: {item: IData; sectionIndex: number}) => {
  const ITEM_WIDTH = item.width + 20;
  // const ITEM_LENGTH = item.items.length;
  const ref = useRef<FlatList>(null);
  const firstItemRef = useRef([]);

  const position = useSharedValue({x: 5, y: 5});

  const collectRefs = (el: never, idx: number) => {
    if (el && !firstItemRef.current.includes(el) && idx === 0) {
      firstItemRef.current.push(el);
    }
  };

  const renderItem = useCallback(({index: idx}: {index: number}) => {
    return (
      <FocusableCard
        idx={idx}
        position={position}
        ref={(el: never) => collectRefs(el, idx)}
        focusKey={`section${sectionIndex}_item${idx}`}
        style={{width: item.width, height: item.height, margin: 10}}
        index={`${sectionIndex} - ${idx}`}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={{zIndex: 99}}>
        {sectionIndex === 0 && (
          <AnimatedBorder
            position={position}
            style={{width: item.width + 5, height: item.height + 5}}
          />
        )}
      </View>
      <FlatList
        ref={ref}
        horizontal={true}
        style={{zIndex: 98}}
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
