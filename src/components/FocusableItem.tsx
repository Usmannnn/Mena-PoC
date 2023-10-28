import {ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import {Touchable} from './Touchable';
import {appActions, useApp} from '../context';
import SidebarItem from './SidebarItem';

const FocusableItem = ({
  index,
  focusKey,
  style,
}: {
  index: number;
  focusKey: string;
  style: ViewStyle;
}) => {
  const {appDispatch} = useApp();

  const onFocusHandler = useCallback(() => {
    appDispatch(appActions.setFocus(focusKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, index]);

  return (
    <Touchable
      style={style}
      onFocus={onFocusHandler}
      onPress={() => console.log('sidebar ' + index)}>
      <SidebarItem index={index} />
    </Touchable>
  );
};

export default FocusableItem;
