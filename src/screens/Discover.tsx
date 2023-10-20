import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Series from '../components/Series';
import Movies from '../components/Movies';

const Discover = () => {
  return (
    <ScreenWrapper>
      <Series />
      <Movies />
    </ScreenWrapper>
  );
};

export default Discover;
