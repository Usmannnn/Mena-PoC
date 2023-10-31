/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Touchable, useTouchable} from './Touchable';
import {useNavigation} from '@react-navigation/native';
import {GetScaledValue} from '../methods';
import useCustomFocus from '../hooks/useCustomFocus';

const GoBack = () => {
  const ref = useRef();
  const {goBack} = useNavigation();
  const {setFocus} = useCustomFocus();

  useEffect(() => {
    setFocus(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Touchable ref={ref} onPress={() => goBack()}>
      <GoBackButton />
    </Touchable>
  );
};

export default GoBack;

const GoBackButton = () => {
  const {hasFocus} = useTouchable();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: hasFocus ? 'blue' : 'black',
        },
      ]}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: GetScaledValue(24),
        }}>
        Go Back
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: GetScaledValue(200),
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: GetScaledValue(10),
  },
});
