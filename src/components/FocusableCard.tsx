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
import {SharedValue} from 'react-native-reanimated';
import {appActions, useApp} from '../context';

interface Props {
  index: number;
  itemWidth: number;
  itemLength: number;
  focusKey: string;
  style: StyleProp<ViewStyle>;
  animated: SharedValue<{x: number; y: number}>;
  horizontalRef: RefObject<FlatList>;
}

const FocusableCard = ({
  index,
  itemWidth,
  itemLength,
  style,
  focusKey,
  animated,
  horizontalRef,
}: Props) => {
  const {appDispatch} = useApp();
  const {scrollToHorizontal} = useScrollHandler();
  const {navigate} = useNavigation<NavigationProp<ParamListBase>>();

  const onFocusHandler = useCallback(() => {
    appDispatch(appActions.setFocus(focusKey));

    scrollToHorizontal(index, itemWidth, itemLength, animated, horizontalRef);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, index, itemWidth, horizontalRef]);

  return (
    <Touchable
      onPress={() => navigate('Detail', {index})}
      style={style}
      onFocus={onFocusHandler}>
      <Card index={focusKey} />
    </Touchable>
  );
};

export default FocusableCard;
