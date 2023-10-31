import {Text, View} from 'react-native';
import React from 'react';
import {Touchable, useTouchable} from './Touchable';
import {GetScaledValue} from '../methods';

const OtherFocusable = ({param}: {param: number}) => {
  return (
    <Touchable onPress={() => alert('other')}>
      <Item param={param} />
    </Touchable>
  );
};

export default OtherFocusable;

const Item = ({param}: {param: number}) => {
  const {hasFocus} = useTouchable();

  return (
    <View
      style={{
        width: GetScaledValue(400),
        height: GetScaledValue(200),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hasFocus ? 'blue' : 'black',
        margin: GetScaledValue(10),
      }}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: GetScaledValue(24),
        }}>
        Other Focusable - {param}
      </Text>
    </View>
  );
};
