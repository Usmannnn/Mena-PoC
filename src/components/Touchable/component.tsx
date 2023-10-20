import React, {forwardRef, LegacyRef, useCallback, useState} from 'react';
import {
  NativeSyntheticEvent,
  TargetedEvent,
  TouchableOpacity,
} from 'react-native';

import {TouchableContextProvider} from './context';
import {TouchableProps} from './types';

export const Touchable = forwardRef(
  ({onFocus, onBlur, children, ...props}: TouchableProps, ref) => {
    const [hasFocus, setHasFocus] = useState(false);

    const onFocusProxy = useCallback(
      (e: NativeSyntheticEvent<TargetedEvent>) => {
        setHasFocus(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const onBlurProxy = useCallback(
      (e: NativeSyntheticEvent<TargetedEvent>) => {
        setHasFocus(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <TouchableOpacity
        {...props}
        onFocus={onFocusProxy}
        onBlur={onBlurProxy}
        activeOpacity={props.activeOpacity || 1}
        tvParallaxProperties={{enabled: false}}
        ref={ref as LegacyRef<TouchableOpacity>}>
        <TouchableContextProvider hasFocus={hasFocus}>
          {children}
        </TouchableContextProvider>
      </TouchableOpacity>
    );
  },
);
