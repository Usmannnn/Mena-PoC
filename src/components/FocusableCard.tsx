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
  position: SharedValue<number>;
  horizontalRef: RefObject<FlatList>;
}

const FocusableCard = ({
  index,
  itemWidth,
  itemLength,
  style,
  focusKey,
  position,
  horizontalRef,
}: Props) => {
  const {appDispatch} = useApp();
  const {scrollToHorizontal} = useScrollHandler();
  const {navigate} = useNavigation<NavigationProp<ParamListBase>>();

  const onFocusHandler = useCallback(() => {
    appDispatch(appActions.setFocus(focusKey));

    scrollToHorizontal(index, itemWidth, itemLength, position, horizontalRef);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, itemWidth, horizontalRef]);

  return (
    <Touchable
      style={style}
      onFocus={onFocusHandler}
      onPress={() => navigate('Detail', {index})}>
      <Card index={focusKey} />
    </Touchable>
  );
};

export default FocusableCard;
