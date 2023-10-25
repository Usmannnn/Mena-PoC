import React, {RefObject, useCallback, useEffect, useLayoutEffect} from 'react';
import {Touchable} from './Touchable';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Card from './Card';
import {
  Animated,
  FlatList,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import useScrollHandler from '../hooks/useScrollHandler';
import {
  SharedValue,
  measure,
  runOnUI,
  useAnimatedRef,
} from 'react-native-reanimated';
import {appActions, useApp} from '../context';
import {GetScaledValue} from '../methods';

interface Props {
  index: number;
  itemWidth: number;
  itemLength: number;
  focusKey: string;
  listRef: RefObject<FlatList>;
  style: StyleProp<ViewStyle>;
  animated: SharedValue<{x: number; y: number}>;
}

const FocusableCard = ({
  index,
  itemWidth,
  itemLength,
  style,
  listRef,
  focusKey,
  animated,
}: Props) => {
  const animatedRef = useAnimatedRef();

  const {appDispatch} = useApp();
  const {width, height} = useWindowDimensions();
  const {scrollToHorizontal} = useScrollHandler();
  const {navigate} = useNavigation<NavigationProp<ParamListBase>>();

  const onFocusHandler = useCallback(() => {
    appDispatch(appActions.setFocus(focusKey));
    scrollToHorizontal(listRef, index, itemWidth, itemLength, animated);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, listRef]);

  // useEffect(() => {
  //   runOnUI(() => {
  //     const measurement = measure(animatedRef);

  //     if (measurement === null) {
  //       return null;
  //     }

  //     console.log(measurement);

  //     animated.value = {
  //       x: measurement.pageX + 10,
  //       y: animated.value.y,
  //     };
  //   })();
  // }, [index, animatedRef]);

  return (
    // <Animated.View ref={animatedRef}>
    <Touchable
      onPress={() => navigate('Detail', {index})}
      style={style}
      onFocus={onFocusHandler}>
      <Card index={focusKey} />
    </Touchable>
    // </Animated.View>
  );
};

export default FocusableCard;
