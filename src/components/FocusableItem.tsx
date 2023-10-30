import {ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import {Touchable} from './Touchable';
import {appActions, useApp} from '../context';
import SidebarItem from './SidebarItem';
import useCustomFocus from '../hooks/useCustomFocus';

const FocusableItem = ({
  index,
  focusKey,
  style,
}: {
  index: number;
  focusKey: string;
  style: ViewStyle;
}) => {
  const {setFocus} = useCustomFocus();
  const {appDispatch, direction} = useApp();

  const onFocusHandler = useCallback(() => {
    appDispatch(appActions.setFocus(focusKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, index]);

  const onPressHandler = useCallback(() => {
    setFocus(direction);
    appDispatch(appActions.setFocus('section1_item0'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, direction]);

  return (
    <Touchable style={style} onFocus={onFocusHandler} onPress={onPressHandler}>
      <SidebarItem index={index} />
    </Touchable>
  );
};

export default FocusableItem;
