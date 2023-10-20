import {FlatList} from 'react-native';
import React from 'react';
import FocusableCard from './FocusableCard';
import {IData} from './AnimatedSection';

const Series = ({item, index}: {item: IData; index: number}) => {
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={item.data}
      renderItem={({index: idx}) => (
        <FocusableCard
          style={{width: item.width, height: item.height}}
          index={`${index} - ${idx}`}
        />
      )}
    />
  );
};

export default Series;
