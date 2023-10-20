import {FlatList} from 'react-native';
import React from 'react';
import FocusableCard from './FocusableCard';

const Movies = () => {
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={[...new Array(10).fill(0)]}
      renderItem={({index}) => <FocusableCard index={index} />}
    />
  );
};

export default Movies;
