import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import GoBack from '../components/GoBack';
import OtherFocusable from '../components/OtherFocusable';
import {Platform, View} from 'react-native';
import {useApp} from '../context';
import {GetScaledValue} from '../methods';

const Detail = () => {
  const {focusKey} = useApp();

  return (
    <ScreenWrapper>
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: Platform.OS === 'android' ? GetScaledValue(200) : 0,
        }}>
        <GoBack />
        <OtherFocusable param={focusKey} />
      </View>
    </ScreenWrapper>
  );
};

export default Detail;
