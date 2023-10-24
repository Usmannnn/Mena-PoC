const useScrollHandler = () => {
  const scrollToVertical = () => {};

  const scrollToHorizontal = () => {};

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