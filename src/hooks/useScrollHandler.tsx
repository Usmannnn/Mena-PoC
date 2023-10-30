import {FlatList, useWindowDimensions} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';
import {useApp} from '../context';
import {RefObject} from 'react';

var prevIndex = 0;
var prevSectionIndex = 0;

const useScrollHandler = () => {
  const {data} = useApp();
  const {width, height} = useWindowDimensions();

  const calculateOffsetX = (
    currentIndex: number,
    itemWidth: number,
    itemLength: number,
    position: SharedValue<{x: number; width: number; height: number}>,
  ) => {
    let offsetX = position.value.x;

    const viewableItemCount = (width - GetScaledValue(220)) / itemWidth;
    // const viewableItemCount = width / itemWidth;
    const integer = Math.floor(viewableItemCount);
    const breakpoint = itemLength - integer;

    const isRight = prevIndex < currentIndex;
    const isLeft = prevIndex > currentIndex;

    if (isRight) {
      if (currentIndex - 1 === breakpoint) {
        // whensidebar is absolute
        offsetX = width - GetScaledValue(220) - itemWidth * (integer - 1);
        // offsetX = width - GetScaledValue(420) - itemWidth * (integer - 1);
      } else if (currentIndex > breakpoint) {
        offsetX += itemWidth;
      }
    }

    if (isLeft) {
      if (currentIndex > breakpoint) {
        offsetX -= itemWidth;
      } else if (currentIndex === breakpoint) {
        offsetX = GetScaledValue(210);
        // offsetX = GetScaledValue(10);
      }
    }
    return offsetX;
  };

  const scrollToHorizontal = (
    currentIndex: number,
    itemWidth: number,
    itemLength: number,
    position: SharedValue<{x: number; width: number; height: number}>,
    listRef: RefObject<FlatList>,
  ) => {
    listRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
      viewPosition: 0,
    });

    position.value = {
      ...position.value,
      x: calculateOffsetX(currentIndex, itemWidth, itemLength, position),
    };

    prevIndex = currentIndex;
  };

  const scrollToVertical = (
    currentSection: number,
    contentY: SharedValue<number>,
    scrollY: SharedValue<number>,
  ) => {
    if (currentSection === 4) {
      contentY.value = height;
    } else {
      contentY.value = height / 2;
    }

    //down
    if (prevSectionIndex < currentSection) {
      scrollY.value -= data[currentSection - 1].height;
    } else if (prevSectionIndex > currentSection) {
      scrollY.value += data[currentSection].height;
    }

    prevSectionIndex = currentSection;
  };

  return {scrollToVertical, scrollToHorizontal};
};

export default useScrollHandler;
