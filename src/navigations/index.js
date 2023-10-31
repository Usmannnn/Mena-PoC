import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DiscoverStack from './DiscoverStack';
import {View} from 'react-native';
import Sidebar from '../components/Sidebar';

const RootNavigationContainer = () => {
  // useTVEventHandler(({eventType}) => {
  //   if (
  //     eventType === 'right' ||
  //     eventType === 'left' ||
  //     eventType === 'up' ||
  //     eventType === 'down'
  //   ) {
  //     appDispatch(appActions.setDirection(eventType));
  //   }
  // });

  return (
    <NavigationContainer>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Sidebar />
        <DiscoverStack />
      </View>
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
