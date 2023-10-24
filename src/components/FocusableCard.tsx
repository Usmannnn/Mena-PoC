import React, {forwardRef, useCallback} from 'react';
import {Touchable} from './Touchable';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Card from './Card';
import {StyleProp, ViewStyle} from 'react-native';
import {appActions, useApp} from '../context';
import useScrollHandler from '../hooks/useScrollHandler';

const FocusableCard = forwardRef(
  (
    {
      idx,
      index,
      position,
      style,
      focusKey,
    }: {
      idx: number;
      index: string;
      position: any;
      focusKey: string;
      style: StyleProp<ViewStyle>;
    },
    ref,
  ) => {
    const {navigate} = useNavigation<NavigationProp<ParamListBase>>();

    const onFocusHandler = useCallback(() => {}, []);

    return (
      <Touchable
        ref={ref}
        onPress={() => navigate('Detail', {index})}
        style={style}
        onFocus={onFocusHandler}>
        <Card index={index} />
      </Touchable>
    );
  },
);

export default FocusableCard;
