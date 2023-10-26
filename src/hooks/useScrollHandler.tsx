import {useWindowDimensions} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {GetScaledValue} from '../methods';
import {useApp} from '../context';

var prevIndex = 0;
var prevSectionIndex = 0;

const useScrollHandler = () => {
  const {data} = useApp();
  const {width, height} = useWindowDimensions();

  const calculateOffsetX = (
    currentIndex: number,
    itemWidth: number,
    itemLength: number,
    animated: SharedValue<{x: number; y: number}>,
    scrollX: SharedValue<number>,
  ) => {
    const viewableItemCount = width / itemWidth;
    const integer = Math.floor(viewableItemCount);
    var decimal = viewableItemCount - integer;
    const breakpoint = itemLength - integer;

    let offsetX = animated.value.x;

    const isRight = prevIndex < currentIndex;
    const isLeft = prevIndex > currentIndex;

    if (currentIndex === breakpoint) {
      offsetX = itemWidth * decimal + GetScaledValue(10);
      scrollX.value =
        scrollX.value - itemWidth + itemWidth * decimal - GetScaledValue(200);
    } else if (currentIndex > breakpoint && currentIndex <= itemLength - 1) {
      //check direction
      if (isRight) {
        offsetX = animated.value.x + itemWidth;
      } else if (isLeft) {
        offsetX = animated.value.x - itemWidth;
      }
    } else {
      if (isRight) {
        scrollX.value = itemWidth * currentIndex * -1;
      } else if (isLeft) {
        scrollX.value += itemWidth;
      }
      offsetX = GetScaledValue(210);
    }

    return offsetX;
  };

  const scrollToHorizontal = (
    currentIndex: number,
    itemWidth: number,
    itemLength: number,
    animated: SharedValue<{x: number; y: number}>,
    scrollX: SharedValue<number>,
  ) => {
    animated.value = {
      x: calculateOffsetX(
        currentIndex,
        itemWidth,
        itemLength,
        animated,
        scrollX,
      ),
      y: animated.value.y,
    };

    prevIndex = currentIndex;
  };

  const scrollToVertical = (
    currentSection: number,
    contentY: SharedValue<number>,
    position: SharedValue<{x: number; y: number}>,
    scrollX: SharedValue<number>,
    scrollY: SharedValue<number>,
  ) => {
    position.value = {
      x: GetScaledValue(210),
      y: position.value.y,
    };

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

    scrollX.value = 0;
    prevSectionIndex = currentSection;
  };

  return {scrollToVertical, scrollToHorizontal};
};

export default useScrollHandler;
