import {RefObject} from 'react';
import {FlatList, useWindowDimensions} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';

var prevIndex = 0;
var prevSectionIndex = 0;

const useScrollHandler = () => {
  const {width, height} = useWindowDimensions();

  const calculateOffsetX = (
    currentIndex: number,
    itemWidth: number,
    itemLength: number,
    animated: SharedValue<{x: number; y: number}>,
  ) => {
    const viewableItemCount = width / itemWidth;
    const integer = Math.floor(viewableItemCount);
    var decimal = viewableItemCount - integer;
    // const decimal = 0.9;
    const breakpoint = itemLength - integer;

    let offsetX = animated.value.x;

    if (currentIndex === breakpoint) {
      // offsetX = GetScaledValue(210);
      offsetX = itemWidth * decimal + GetScaledValue(10);
      console.log('first', itemWidth, decimal, offsetX);
    } else if (currentIndex > breakpoint && currentIndex <= itemLength - 1) {
      offsetX =
        prevIndex > currentIndex
          ? animated.value.x - itemWidth
          : animated.value.x + itemWidth;
    } else {
      offsetX = GetScaledValue(210);
    }

    return offsetX;
  };

  const scrollToHorizontal = (
    listRef: RefObject<FlatList>,
    currentIndex: number,
    itemWidth: number,
    itemLength: number,
    animated: SharedValue<{x: number; y: number}>,
  ) => {
    listRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
      viewPosition: 0,
    });

    animated.value = {
      x: calculateOffsetX(currentIndex, itemWidth, itemLength, animated),
      y: animated.value.y,
    };

    prevIndex = currentIndex;
  };

  const scrollToVertical = (
    sectionRef: RefObject<FlatList>,
    ref: RefObject<FlatList>,
    currentSection: number,
    contentY: SharedValue<number>,
    position: SharedValue<{x: number; y: number}>,
  ) => {
    // ref.current?.scrollToIndex({
    //   index: 0,
    //   animated: true,
    //   viewPosition: 0,
    // });

    sectionRef.current?.scrollToIndex({
      index: currentSection,
      animated: true,
      viewPosition: 0,
    });

    position.value = {
      x: GetScaledValue(210),
      y: position.value.y,
    };

    if (prevSectionIndex < currentSection && currentSection === 4) {
      contentY.value = height;
      prevSectionIndex = currentSection;

      return;
    } else {
      contentY.value = height / 2;
      prevSectionIndex = currentSection;

      return;
    }
  };

  return {scrollToVertical, scrollToHorizontal};
};

export default useScrollHandler;
