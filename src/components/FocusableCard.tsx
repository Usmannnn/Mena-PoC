import React, {RefObject, useCallback} from 'react';
import {Touchable} from './Touchable';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Card from './Card';
import {FlatList, StyleProp, ViewStyle} from 'react-native';
import useScrollHandler from '../hooks/useScrollHandler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {appActions, useApp} from '../context';
import {GetScaledValue} from '../methods';

interface Props {
  index: number;
  itemWidth: number;
  itemHeight: number;
  itemLength: number;
  focusKey: string;
  style: StyleProp<ViewStyle>;
  position: SharedValue<{x: number; width: number}>;
  horizontalRef: RefObject<FlatList>;
  sectionWidth: SharedValue<number>;
}

const FocusableCard = ({
  index,
  itemWidth,
  itemHeight,
  itemLength,
  style,
  focusKey,
  position,
  horizontalRef,
  sectionWidth,
}: Props) => {
  const cond = focusKey === 'section4_item0';
  const {appDispatch} = useApp();
  const {scrollToHorizontal} = useScrollHandler();
  const {navigate} = useNavigation<NavigationProp<ParamListBase>>();

  const onFocusHandler = useCallback(() => {
    appDispatch(appActions.setFocus(focusKey));
    scrollToHorizontal(index, itemWidth, itemLength, position, horizontalRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, itemWidth, horizontalRef]);

  const animated = useAnimatedStyle(() => ({
    width: withTiming(sectionWidth.value, {duration: 400}),
  }));

  const onPress = useCallback(() => {
    if (cond) {
      const width =
        sectionWidth.value === GetScaledValue(1200)
          ? (sectionWidth.value = itemWidth - GetScaledValue(20))
          : GetScaledValue(1200);

      sectionWidth.value = width;

      position.value = {
        ...position.value,
        width,
      };
    } else {
      navigate('Detail', {index});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, focusKey, cond]);

  return (
    <Animated.View style={[cond && animated, {height: itemHeight}, style]}>
      <Touchable style={{flex: 1}} onFocus={onFocusHandler} onPress={onPress}>
        <Card index={focusKey} />
      </Touchable>
    </Animated.View>
  );
};

export default FocusableCard;
