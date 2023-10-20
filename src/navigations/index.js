import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DiscoverStack from './DiscoverStack';

const RootNavigationContainer = () => {
  return (
    <NavigationContainer>
      <DiscoverStack />
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
