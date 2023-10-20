import {TVFocusGuideView, Text, View} from 'react-native';
import React from 'react';
import {Touchable, useTouchable} from './Touchable';

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
        width: 400,
        height: 200,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hasFocus ? 'blue' : 'black',
        margin: 10,
      }}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
        Other Focusable - {param}
      </Text>
    </View>
  );
};
