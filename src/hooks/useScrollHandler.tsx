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
    const decimal = viewableItemCount - integer;
    const breakpoint = itemLength - integer;

    let offsetX = animated.value.x;

    if (currentIndex === breakpoint) {
      offsetX = itemWidth * decimal + GetScaledValue(10);
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
    currentSection: number,
    contentY: SharedValue<number>,
  ) => {
    sectionRef.current?.scrollToIndex({
      index: currentSection,
      animated: true,
      viewPosition: 0,
    });

    if (prevSectionIndex < currentSection && currentSection === 4) {
      console.log('first');

      contentY.value = height;
      prevSectionIndex = currentSection;

      return;
    } else {
      console.log('else');

      contentY.value = height / 2;
      prevSectionIndex = currentSection;

      return;
    }
  };

  return {scrollToVertical, scrollToHorizontal};
};

export default useScrollHandler;

// const scrollToHorizontal = (
//   listRef: RefObject<FlatList>,
//   animated: SharedValue<{x: number; y: number}>,
//   currentIndex: number,
//   focusKey: string,
//   // firstItemRef: any,
// ) => {
//   const length = data[currentIndex].items.length;
//   const itemWidth = data[currentIndex].items.itemWidth;

//   const viewableItemCount = width / itemWidth;
//   const integer = Math.floor(viewableItemCount);
//   const decimal = viewableItemCount - integer;
//   const breakpoint = length - integer;

//   appDispatch(appActions.setFocus(focusKey));
//   console.log({direction});

//   switch (direction) {
//     case AbstractKeys.RIGHT:
//       listRef.current?.scrollToIndex({
//         index: currentIndex + 1,
//         animated: true,
//         viewPosition: 0,
//       });
//       let rightPosition: number;
//       if (currentIndex === breakpoint) {
//         rightPosition = animated.value.x + itemWidth * decimal;
//       } else if (currentIndex > breakpoint) {
//         rightPosition = animated.value.x + itemWidth;
//       } else {
//         rightPosition = animated.value.x;
//       }
//       animated.value = {
//         x: rightPosition,
//         y: animated.value.y,
//       };
//       break;
//     case AbstractKeys.LEFT:
//       listRef.current?.scrollToIndex({
//         index: currentIndex - 1,
//         animated: true,
//         viewPosition: 0,
//       });
//       let leftPosition =
//         currentIndex >= breakpoint ? animated.value.x - itemWidth : 10;
//       animated.value = {
//         x: leftPosition,
//         y: animated.value.y,
//       };
//       break;
//     case AbstractKeys.UP:
//     case AbstractKeys.DOWN:
//       // setFocus(firstItemRef.current[0]);
//       listRef.current?.scrollToIndex({
//         index: 0,
//         animated: true,
//         viewPosition: 0,
//       });
//       animated.value = {
//         x: 10,
//         y: animated.value.y,
//       };
//       break;
//     default:
//       break;
//   }
// };
