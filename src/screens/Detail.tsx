import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import GoBack from '../components/GoBack';
import OtherFocusable from '../components/OtherFocusable';
import {useRoute} from '@react-navigation/native';
import {View} from 'react-native';

const Detail = () => {
  const {index} = useRoute().params;

  return (
    <ScreenWrapper>
      <View style={{flexDirection: 'row'}}>
        <GoBack />
        <OtherFocusable param={index} />
      </View>
    </ScreenWrapper>
  );
};

export default Detail;
