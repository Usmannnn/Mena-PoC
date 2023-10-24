import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DiscoverStack from './DiscoverStack';
import {useTVEventHandler} from 'react-native';
import {appActions, useApp} from '../context';

const RootNavigationContainer = () => {
  const {appDispatch} = useApp();

  useTVEventHandler(({eventType}) => {
    if (eventType === 'right' || eventType === 'left') {
      console.log({eventType});

      appDispatch(appActions.setDirection('eventType'));
      appDispatch(appActions.setDirection(eventType));
    }
  });

  return (
    <NavigationContainer>
      <DiscoverStack />
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
