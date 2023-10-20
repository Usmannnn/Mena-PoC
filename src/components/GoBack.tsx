import {TVFocusGuideView, Text, View} from 'react-native';
import React from 'react';
import {Touchable, useTouchable} from './Touchable';
import {useNavigation} from '@react-navigation/native';

const GoBack = () => {
  const {goBack} = useNavigation();

  return (
    <Touchable onPress={() => goBack()}>
      <GoBackButton />
    </Touchable>
  );
};

export default GoBack;

const GoBackButton = () => {
  const {hasFocus} = useTouchable();

  return (
    <View
      style={{
        width: 200,
        height: 200,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hasFocus ? 'blue' : 'black',
        margin: 10,
      }}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
        Go Back
      </Text>
    </View>
  );
};
