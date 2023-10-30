import {Image, View} from 'react-native';
import React from 'react';
import {useApp} from '../context';

const TrailerContent = () => {
  const {data} = useApp();

  return (
    <View style={{flex: 1}}>
      <Image
        source={data[4].items[0].poster}
        style={{flex: 1, width: '100%'}}
      />
    </View>
  );
};

export default TrailerContent;
