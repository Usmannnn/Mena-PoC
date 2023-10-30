import {Text, View} from 'react-native';
import React from 'react';
import {useTouchable} from './Touchable';
import {GetScaledValue} from '../methods';

const SidebarItem = ({index}: {index: number}) => {
  const {hasFocus} = useTouchable();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hasFocus ? 'blue' : 'yellow',
      }}>
      <Text style={{fontSize: GetScaledValue(24), color: 'black'}}>
        icon {index}
      </Text>
    </View>
  );
};

export default SidebarItem;
