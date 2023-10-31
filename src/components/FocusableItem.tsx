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
  const {appDispatch, refs} = useApp();

  const onFocusHandler = useCallback(() => {
    appDispatch(appActions.setFocus(focusKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, index]);

  const onPressHandler = useCallback(() => {
    // console.log(refs[0]);
    // setFocus(refs[0]);
    // appDispatch(appActions.setFocus('section1_item0'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, refs]);

  return (
    <Touchable style={style} onFocus={onFocusHandler} onPress={onPressHandler}>
      <SidebarItem index={index} />
    </Touchable>
  );
};

export default FocusableItem;
